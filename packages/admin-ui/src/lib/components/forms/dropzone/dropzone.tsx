import { type FC } from 'react';

import { cn } from '@ebloc/theme';
import { UploadCloudIcon } from 'lucide-react';

import { t } from '@/lib/locales';

import { DropzonePreviewItem } from './dropzone-preview-item';

// If no product work with previews
// if product, upload images and show url previews
export const Dropzone: FC<Props> = ({
  onDrop,
  onAssetClick,
  setChecked,
  checked,
  previews = [],
  className
}) => {
  const defaultAsset = previews[0];

  const handleCheck = (isChecked: boolean, source: string) => {
    if (isChecked) {
      setChecked([...checked, source]);
    } else {
      setChecked(checked.filter(item => item !== source));
    }
  };

  if (previews?.length) {
    return (
      <div className="flex gap-4">
        <DropzonePreviewItem
          className="w-36 h-36"
          source={defaultAsset}
          onClick={() => onAssetClick(defaultAsset)}
          onCheck={isChecked => handleCheck(isChecked, defaultAsset)}
        />
        <div className="flex gap-4 flex-wrap">
          {previews
            .filter(preview => preview !== defaultAsset)
            .map(preview => (
              <DropzonePreviewItem
                key={preview}
                className="w-16 h-16"
                source={preview}
                onClick={() => onAssetClick(defaultAsset)}
                onCheck={isChecked => handleCheck(isChecked, preview)}
              />
            ))}
          <SingleDropzone className="w-16 h-16" onDrop={onDrop} />
        </div>
      </div>
    );
  }

  return <SingleDropzone className={className} onDrop={onDrop} isFull />;
};

const SingleDropzone: FC<SingleDropzoneProps> = ({ onDrop, isFull, className }) => {
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
  onAssetClick: (source: string) => void;
  setChecked: (checked: string[]) => void;
  checked: string[];
  previews?: string[];
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
