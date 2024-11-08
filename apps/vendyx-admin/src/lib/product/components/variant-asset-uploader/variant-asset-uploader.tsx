import { type FC, useEffect, useState } from 'react';

import { Loader2Icon, XIcon } from 'lucide-react';

import { Dropzone } from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

import { useVariantContext } from '../../contexts';

export const VariantAssetUploader: FC<Props> = ({
  image,
  onRemove,
  onUpload,
  size,
  isLoading,
  disabled
}) => {
  const { variants, product } = useVariantContext();
  const [file, setFile] = useState<File | null>(null);

  // Every time variants change, reset the file
  // This is to avoid a bug where the user adds an image [file: File, image: 'http://...']
  // Then user removes image [file: File, image: null] in this point, file still renders
  // So every time variants change, we reset the file because we use file to show a preview while uploading
  useEffect(() => {
    setFile(null);
  }, [variants]);

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (image || file) {
    return (
      <div className="relative group">
        <button
          type="button"
          className="z-10 opacity-0 absolute top-0 right-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-full bg-muted"
          onClick={() => {
            setFile(null);
            onRemove();
          }}
          disabled={isLoading}
        >
          <XIcon size={12} className="" />
        </button>
        <div className="relative">
          <img
            {...getSize(size)}
            src={file ? URL.createObjectURL(file) : image ?? ''}
            alt="Uploaded"
            className={cn(isLoading && 'opacity-50')}
          />
          {isLoading && (
            <Loader2Icon size={24} className={`absolute animate-spin top-1/3 right-1/3`} />
          )}
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      disabled={!product || disabled}
      disabledMessage="Create variant before adding a photo"
      size={size}
      onAcceptFiles={files => {
        const file = files[0];

        setFile(file);
        onUpload(file);
      }}
    />
  );
};

const getSize = (size: Size) => {
  if (size === 'sm') {
    return { width: 48, height: 48 };
  }

  if (size === 'md') {
    return { width: 60, height: 60 };
  }
};

type Props = {
  image?: string;
  size: Size;
  disabled?: boolean;
  onRemove: () => void;
  onUpload: (file: File) => void;
  isLoading?: boolean;
};

type Size = 'sm' | 'md';
