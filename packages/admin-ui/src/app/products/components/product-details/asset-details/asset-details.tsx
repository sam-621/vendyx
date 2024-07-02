import { type FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';
import { Trash2Icon } from 'lucide-react';

import { useCreateAsset, useRemoveAssets } from '@/app/assets';
import { useProductDetailsContext } from '@/app/products/context';
import { ProductKeys, useUpdateProduct } from '@/app/products/hooks';
import { AssetPreview } from '@/lib/components';
import { Dropzone } from '@/lib/components/forms';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { getFileListIntoArray, getFilePreview } from '@/lib/utils';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const AssetDetails: FC<Props> = () => {
  const { createAsset } = useCreateAsset();
  const { removeAssets } = useRemoveAssets();
  const { updateProduct } = useUpdateProduct();
  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { product } = useProductDetailsContext();

  const defaultAssets = product?.assets?.items ?? [];
  const isCreatingProducts = !product;

  const [previews, setPreviews] = useState<string[]>(defaultAssets.map(asset => asset.source));
  const [files, setFiles] = useState<File[]>([]);
  const [assetToPreview, setAssetToPreview] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    setValue('assets', files);
  }, [previews]);

  useEffect(() => {
    setPreviews(defaultAssets.map(asset => asset.source));
  }, [product]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>{checked.length ? `${checked.length} selected` : 'Assets'}</CardTitle>
          {Boolean(checked.length) && (
            <Button
              type="button"
              variant="link"
              className="flex gap-1 text-destructive p-0 h-4 mt-0"
              onClick={async () => {
                if (isCreatingProducts) {
                  setPreviews(previews.filter(preview => !checked.includes(preview)));
                  setFiles(files.filter(file => !checked.includes(file.name)));
                } else {
                  const newAssets = defaultAssets.filter(asset => !checked.includes(asset.source));
                  const removedAssets = defaultAssets.filter(asset =>
                    checked.includes(asset.source)
                  );

                  await updateProduct(product?.id, {
                    assetsIds: newAssets.map(asset => asset.id)
                  });
                  await removeAssets(removedAssets.map(asset => asset.id));
                  await queryClient.invalidateQueries({
                    queryKey: ProductKeys.single(product.slug)
                  });

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
            previews={previews}
            checked={checked}
            setChecked={setChecked}
            onAssetClick={source => setAssetToPreview(source)}
            onDrop={async droppedFiles => {
              if (isCreatingProducts) {
                // add previews state
                setPreviews([
                  ...previews,
                  ...getFileListIntoArray(droppedFiles).map(file => getFilePreview(file))
                ]);
                setFiles([...files, ...getFileListIntoArray(droppedFiles)]);
              } else {
                // mark page as loading
                // upload assets
                // update product
                const notificationId = notification.loading('Uploading asset...');

                const assets = (await createAsset(getFileListIntoArray(droppedFiles))) ?? [];

                if (!assets.length) {
                  notification.dismiss(notificationId);
                  notification.error('Failed to upload asset');
                  return;
                }

                await updateProduct(product.id, {
                  assetsIds: [
                    ...defaultAssets.map(asset => asset.id),
                    ...assets.map(asset => asset.id)
                  ]
                });
                await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product.slug) });

                notification.dismiss(notificationId);
                notification.success('Asset uploaded successfully');
              }
            }}
            className="h-36"
          />
        </CardContent>
      </Card>
      <AssetPreview
        assets={defaultAssets}
        source={assetToPreview}
        isOpen={!!assetToPreview}
        setIsOpen={(isOpen: boolean) => setAssetToPreview(isOpen ? assetToPreview : '')}
      />
    </>
  );
};

type Props = {
  assets?: CommonProductFragment['assets'];
};
