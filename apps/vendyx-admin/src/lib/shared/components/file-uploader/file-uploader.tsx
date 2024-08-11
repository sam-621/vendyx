/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { type FC, useState } from 'react';

import { cn, isFirst } from '../../utils';
import { Dropzone } from '../dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

export const FileUploader: FC<Props> = ({ onAcceptFiles }) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!files.length && (
          <Dropzone
            size="lg"
            onAcceptFiles={acceptedFiles => {
              // setPreviews(files.map(file => URL.createObjectURL(file)));
              const newFiles = [...files, ...acceptedFiles];

              setFiles(newFiles);
              onAcceptFiles(newFiles);
            }}
          />
        )}
        {Boolean(files.length) && (
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, i) => (
              <div
                key={file.name + file.size}
                className={cn('aspect-w-1 aspect-h-1', isFirst(i) && 'col-span-3')}
              >
                <img
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  className="object-cover rounded w-full h-full hover:opacity-60 cursor-pointer"
                />
              </div>
            ))}
            <Dropzone
              size="lg"
              onAcceptFiles={acceptedFiles => {
                setFiles([...files, ...acceptedFiles]);
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type Props = {
  onAcceptFiles: (files: File[]) => void;
};
