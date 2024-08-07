'use client';

import { type FC, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadIcon } from 'lucide-react';

import { cn } from '../../utils';

export const Dropzone: FC<Props> = ({ size, onAcceptFiles }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    onAcceptFiles(acceptedFiles);
  }, [acceptedFiles, onAcceptFiles]);

  return (
    <label
      className={cn(
        'w-[60px] h-[60px] rounded-md border border-dashed flex items-center justify-center hover:bg-muted/50 cursor-pointer',
        getSize(size)
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} type="file" className="hidden" />
      <UploadIcon size={16} />
    </label>
  );
};

type Props = {
  size: 'sm' | 'md' | 'lg';
  onAcceptFiles: (files: File[]) => void;
};

const getSize = (size: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'w-[72px] h-[72px]';
};
