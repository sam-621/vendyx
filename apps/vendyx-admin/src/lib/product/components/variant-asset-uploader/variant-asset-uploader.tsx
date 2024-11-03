import { type FC, useState } from 'react';

import { Loader2Icon, XIcon } from 'lucide-react';

import { Dropzone } from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

import { useVariantContext } from '../../contexts';

export const VariantAssetUploader: FC<Props> = ({ image, onRemove, onUpload, size, isLoading }) => {
  const { product } = useVariantContext();
  const [file, setFile] = useState<File | null>(null);

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (image || file) {
    return (
      <div className="relative group">
        <button
          type="button"
          className="z-10 opacity-0 absolute top-0 right-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 rounded-full bg-muted"
          onClick={onRemove}
          disabled={isLoading}
        >
          <XIcon size={12} className="" />
        </button>
        <div className="relative">
          <img
            {...getSize(size)}
            src={image ?? (file ? URL.createObjectURL(file) : '')}
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
      disabled={!product}
      size={'md'}
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
  onRemove: () => void;
  onUpload: (file: File) => void;
  isLoading?: boolean;
};

type Size = 'sm' | 'md';
