'use client';

import { type FC } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadIcon } from 'lucide-react';

import { cn } from '../../utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

export const Dropzone: FC<Props> = ({ size, disabled, onAcceptFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted(files) {
      onAcceptFiles(files);
    }
  });

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className={cn(getSize(size), 'opacity-50 flex-shrink-0')}>
              <label
                className={cn(
                  'rounded-md border border-dashed flex items-center justify-center w-full h-full cursor-not-allowed'
                )}
              >
                <UploadIcon size={size === 'lg' ? 24 : 16} />
              </label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create variant before adding a photo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={cn(getSize(size), 'flex-shrink-0')}>
      <label
        className={cn(
          'rounded-md border border-dashed cursor-pointer flex items-center justify-center w-full h-full',
          !disabled && 'hover:bg-muted/50'
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} type="file" className="hidden" disabled={disabled} />
        <UploadIcon size={size === 'lg' ? 24 : 16} />
      </label>
    </div>
  );
};

type Props = {
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onAcceptFiles: (files: File[]) => void;
};

const getSize = (size: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'aspect-w-1 aspect-h-1';
};
