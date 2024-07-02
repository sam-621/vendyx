import { type FC, useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { cn } from '@ebloc/theme';
import { UploadCloudIcon } from 'lucide-react';

import { type EblocAsset } from '@/lib/ebloc/rest';
import { t } from '@/lib/locales';

import { AssetPreview } from '../../asset-preview/asset-preview';
import { DropzoneItem } from './dropzone-item';

/**
 * Dropzone component to upload files
 *
 * @example
 * ```tsx
 * <Dropzone
 *   onDrop={files => uploadFiles(files)}
 *   allAssets={defaultAssets}
 *   setChecked={setChecked}
 *   checked={checked}
 *   previews={previews}
 * />
 * ```
 */
export const Dropzone: FC<Props> = ({
  onDrop,
  onHandleDragEnd,
  onMarkAsDefault,
  allAssets = [],
  setChecked,
  checked,
  previews = [],
  className
}) => {
  const defaultAsset = previews[0];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const [assetToPreview, setAssetToPreview] = useState('');
  const [items, setItems] = useState(previews.filter(preview => preview !== defaultAsset));

  const handleCheck = (isChecked: boolean, source: string) => {
    if (isChecked) {
      setChecked([...checked, source]);
    } else {
      setChecked(checked.filter(item => item !== source));
    }
  };

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active?.id as string);
      const newIndex = items.indexOf(over?.id as string);

      const orderedItems = arrayMove(items, oldIndex, newIndex);
      const orderedAssetsIds = orderedItems
        .map(item => allAssets.find(asset => asset.source === item)?.id)
        .filter(Boolean) as string[];

      setItems(orderedItems);
      await onHandleDragEnd(orderedAssetsIds);
    }
  }

  useEffect(() => {
    setItems(previews.filter(preview => preview !== defaultAsset));
  }, [previews.length, defaultAsset]);

  if (previews?.length) {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col lg:flex-row gap-4">
          <DropzoneItem
            className="w-full lg:w-52 h-52"
            source={defaultAsset}
            checked={checked.includes(defaultAsset)}
            onClick={() => setAssetToPreview(defaultAsset)}
            onCheck={isChecked => handleCheck(isChecked, defaultAsset)}
            canSort={false}
          />
          <div className="flex gap-4 flex-wrap">
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items
                .filter(preview => preview !== defaultAsset)
                .map(preview => (
                  <DropzoneItem
                    key={preview}
                    className="w-24 h-24"
                    source={preview}
                    checked={checked.includes(preview)}
                    onClick={() => setAssetToPreview(preview)}
                    onCheck={isChecked => handleCheck(isChecked, preview)}
                    canSort={Boolean(allAssets.length)}
                  />
                ))}
            </SortableContext>

            <SingleDropzone className="w-24 h-24" onDrop={onDrop} />
          </div>
        </div>
        <AssetPreview
          onActionClick={async asset => await onMarkAsDefault(asset)}
          asset={allAssets.find(asset => asset.source === assetToPreview)}
          source={assetToPreview}
          isOpen={!!assetToPreview}
          setIsOpen={(isOpen: boolean) => setAssetToPreview(isOpen ? assetToPreview : '')}
        />
      </DndContext>
    );
  }

  return <SingleDropzone className={className} onDrop={onDrop} isFull />;
};

export const SingleDropzone: FC<SingleDropzoneProps> = ({ onDrop, isFull, className }) => {
  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        'flex flex-col items-center justify-center w-full h-full border-2 border-input hover:border-ring border-dashed rounded-lg cursor-pointer transition-colors',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadCloudIcon width={isFull ? 24 : 16} className="text-muted-foreground" />
        {isFull && (
          <p className="text-sm text-muted-foreground">{t('product-details.assets.placeholder')}</p>
        )}
      </div>
      <input
        // onChange={e => setAssets(getFileListIntoArray(e.target.files))}
        onChange={e => onDrop(e.target.files)}
        multiple
        id="dropzone-file"
        type="file"
        className="hidden"
      />
    </label>
  );
};

type Props = {
  /**
   * Callback to be called when files are dropped
   */
  onDrop: (files: FileList | null) => void;
  /**
   * Callback to be called when assets have been reordered
   */
  onHandleDragEnd: (orderedAssetsIds: string[]) => Promise<void>;
  /**
   * Callback to be called when an asset is marked as default
   */
  onMarkAsDefault: (asset: DropzoneAsset) => Promise<void>;
  /**
   * Set function to update checked assets
   */
  setChecked: (checked: string[]) => void;
  /**
   * Array of checked assets
   */
  checked: string[];
  /**
   * Array of assets to be shown as previews, this is different from allAssets for two reasons:
   * 1. It doesn't include the default asset
   * 2. It's used to manage the internal state of new assets previews when localStateMode is true
   */
  previews?: string[];
  /**
   * List of persisted assets. Used to show initial values
   */
  allAssets?: DropzoneAsset[];
  className?: string;
};

type SingleDropzoneProps = {
  /**
   * Callback to be called when files are dropped
   */
  onDrop: (files: FileList | null) => void;
  /**
   * If true, dropzone label will be show and icon will be bigger
   */
  isFull?: boolean;
  className?: string;
};

export type DropzoneAsset = Pick<EblocAsset, 'source' | 'id' | 'name' | 'createdAt' | 'order'>;
