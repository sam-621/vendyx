import { type Dispatch, type FC, type SetStateAction } from 'react';

import { cn } from '@ebloc/theme';
import { UploadCloudIcon } from 'lucide-react';

import { t } from '@/lib/locales';
import { getFileListIntoArray } from '@/lib/utils';

export const Dropzone: FC<Props> = ({ setAssets, className }) => {
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
        <p className="text-sm text-muted-foreground">{t('product-details.assets.placeholder')}</p>
      </div>
      <input
        onChange={e => setAssets(getFileListIntoArray(e.target.files))}
        multiple
        id="dropzone-file"
        type="file"
        className="hidden"
      />
    </label>
  );
};

type Props = {
  setAssets: Dispatch<SetStateAction<File[]>>;
  className?: string;
};
