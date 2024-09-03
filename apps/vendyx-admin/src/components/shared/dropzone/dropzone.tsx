'use client';

import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Dropzone: FC<Props> = ({ size, onAcceptFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files) {
      onAcceptFiles(files);
    }
  });

  return (
    <div className={getSize(size)}>
      <label
        className={cn(
          'rounded-md border border-dashed hover:bg-muted/50 cursor-pointer flex items-center justify-center w-full h-full'
          // getSize(size)
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" className="hidden" />
        <UploadIcon size={size === 'lg' ? 24 : 16} />
      </label>
    </div>
  );
};

type Props = {
  size: 'sm' | 'md' | 'lg';
  onAcceptFiles: (files: File[]) => void;
};

const getSize = (size: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'aspect-w-1 aspect-h-1';
};
