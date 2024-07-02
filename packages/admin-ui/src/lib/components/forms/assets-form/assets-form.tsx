import { type FC, useEffect, useState } from 'react';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useCreateAsset, useRemoveAssets } from '@/app/assets';
import { notification } from '@/lib/notifications';
import { getFileListIntoArray, getFilePreview } from '@/lib/utils';

import { Dropzone, type DropzoneAsset } from '../dropzone/dropzone';

/**
 * Common form to manage assets. It can be used to upload assets or remove them into a entity
 *
 * @example
 * ```tsx
 * <AssetsForm
 *   allAssets={defaultAssets}
 *   localStateMode={isCreatingProduct}
 *   onFilesInMemoryChange={files => setValue('assets', files)}
 *   onNewAssets={async assets => {
 *     await updateProduct(product?.id ?? '', {
 *       assetsIds: assets
 *     });
 *   }}
 *   onFinishMutations={async () => {
 *     await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product?.slug ?? '') });
 *   }}
 * />
 * ```
 */
export const AssetsForm: FC<Props> = ({
  allAssets,
  localStateMode,
  onNewAssets,
  onFilesInMemoryChange,
  onFinishMutations
}) => {
  const { createAsset } = useCreateAsset();
  const { removeAssets } = useRemoveAssets();

  const [previews, setPreviews] = useState<string[]>(allAssets.map(asset => asset.source));
  const [files, setFiles] = useState<{ file: File; previewId: string }[]>([]);

  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    onFilesInMemoryChange(files.map(file => file.file));
  }, [previews]);

  useEffect(() => {
    setPreviews(allAssets.map(asset => asset.source));
  }, [allAssets.length]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{checked.length ? `${checked.length} selected` : 'Assets'}</CardTitle>
        {Boolean(checked.length) && (
          <Button
            type="button"
            variant="link"
            className="flex gap-1 text-destructive p-0 h-4 mt-0"
            onClick={async () => {
              if (localStateMode) {
                setPreviews(previews.filter(preview => !checked.includes(preview)));
                setFiles(files.filter(file => !checked.includes(file.previewId)));
              } else {
                const newAssets = allAssets.filter(asset => !checked.includes(asset.source));
                const removedAssets = allAssets.filter(asset => checked.includes(asset.source));

                await onNewAssets(newAssets.map(asset => asset.id));
                await removeAssets(removedAssets.map(asset => asset.id));

                await onFinishMutations();

                notification.success('Asset removed successfully');
              }

              setChecked([]);
            }}
          >
            <Trash2Icon size={16} />
            Remove selected
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Dropzone
          allAssets={allAssets}
          previews={previews}
          checked={checked}
          setChecked={setChecked}
          onDrop={async droppedFiles => {
            if (localStateMode) {
              // add previews state
              const newPreviewsState = [...previews];
              const newFilesState = [...files];

              getFileListIntoArray(droppedFiles).forEach(file => {
                const previewId = getFilePreview(file);
                newPreviewsState.push(previewId);
                newFilesState.push({ file, previewId });
              });

              setPreviews([...newPreviewsState]);
              setFiles([...newFilesState]);
            } else {
              const notificationId = notification.loading('Uploading asset...');

              const assets = (await createAsset(getFileListIntoArray(droppedFiles))) ?? [];

              if (!assets.length) {
                notification.dismiss(notificationId);
                notification.error('Failed to upload asset');
                return;
              }

              await onNewAssets([
                ...allAssets.map(asset => asset.id),
                ...assets.map(asset => asset.id)
              ]);
              await onFinishMutations();

              notification.dismiss(notificationId);
              notification.success('Asset uploaded successfully');
            }
          }}
          className="h-36"
        />
      </CardContent>
    </Card>
  );
};

type Props = {
  allAssets: DropzoneAsset[];
  /**
   * Flag to indicate if the form is creating a new entity. If true, the form will not make any request to the server, just update the local state
   */
  localStateMode: boolean;
  /**
   * Callback to be called when all mutations (uploading, removing, etc) are finished. Usually used to refetch the entity with new data
   */
  onFinishMutations: () => Promise<void>;
  /**
   * Callback to be called just after new assets are uploaded. Usually used to add the new assets to the entity
   */
  onNewAssets: (assets: string[]) => Promise<void>;
  /**
   * Callback to be called when the files in memory change. Used to update the form state
   */
  onFilesInMemoryChange: (files: File[]) => void;
};
