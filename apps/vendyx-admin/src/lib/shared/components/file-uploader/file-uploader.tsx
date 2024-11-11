/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { type FC, useMemo, useState } from 'react';

import { cn, isFirst } from '@/lib/shared/utils';

import { Dropzone } from '../dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

export const FileUploader: FC<Props> = ({
  onAcceptFiles,
  defaultPreviews,
  dissabledState,
  title = 'Images'
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const previews = useMemo(
    () => [...(defaultPreviews ?? []), ...files.map(file => URL.createObjectURL(file))],
    [files, defaultPreviews]
  );

  const _onAcceptFiles = (acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];

    !dissabledState && setFiles(newFiles);
    onAcceptFiles(newFiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!previews.length && <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />}
        {Boolean(previews.length) && (
          <div className="grid grid-cols-3 gap-4">
            {previews.map((file, i) => (
              <div key={file} className={cn('aspect-w-1 aspect-h-1', isFirst(i) && 'col-span-3')}>
                <img
                  key={file}
                  src={file}
                  className="object-cover rounded w-full h-full hover:opacity-60 cursor-pointer"
                />
              </div>
            ))}
            <Dropzone size="lg" onAcceptFiles={_onAcceptFiles} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  onAcceptFiles: (files: File[]) => void;
  title?: string;
  defaultPreviews?: string[];
  dissabledState?: boolean;
};
