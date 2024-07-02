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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active?.id as string);
        const newIndex = items.indexOf(over?.id as string);

        const news = arrayMove(items, oldIndex, newIndex);

        return news;
      });
    }
  }

  useEffect(() => {
    setItems(previews.filter(preview => preview !== defaultAsset));
  }, [previews.length]);

  if (previews?.length) {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-4">
          <DropzoneItem
            className="w-52 h-52"
            source={defaultAsset}
            checked={checked.includes(defaultAsset)}
            onClick={() => setAssetToPreview(defaultAsset)}
            onCheck={isChecked => handleCheck(isChecked, defaultAsset)}
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
                  />
                ))}
            </SortableContext>

            <SingleDropzone className="w-24 h-24" onDrop={onDrop} />
          </div>
        </div>
        <AssetPreview
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
  onDrop: (files: FileList | null) => void;
  setChecked: (checked: string[]) => void;
  checked: string[];
  previews?: string[];
  allAssets?: DropzoneAsset[];
  className?: string;
};

type SingleDropzoneProps = {
  onDrop: (files: FileList | null) => void;
  /**
   * If true, dropzone label will be show and icon will be bigger
   */
  isFull?: boolean;
  className?: string;
};

export type DropzoneAsset = Pick<EblocAsset, 'source' | 'id' | 'name' | 'createdAt'>;
