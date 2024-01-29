import { type FC } from 'react';

import { cn } from '@vendyx/theme';
import { UploadCloudIcon } from 'lucide-react';

export const Dropzone: FC<Props> = ({ className }) => {
  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        'flex flex-col items-center justify-center w-full h-full border-2 border-input hover:border-ring border-dashed rounded-lg cursor-pointer transition-colors',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-2">
        <UploadCloudIcon width={24} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Accepts .jpg and .png</p>
      </div>
      <input type="file" className="hidden" />
    </label>
  );
};

type Props = {
  className?: string;
};
