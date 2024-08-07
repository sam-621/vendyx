import { type FC } from 'react';

import { UploadIcon } from 'lucide-react';

import { cn } from '../../utils';

export const Dropzone: FC<Props> = ({ size }) => {
  return (
    <div
      className={cn(
        'w-[60px] h-[60px] rounded-md border border-dashed flex items-center justify-center',
        getSize(size)
      )}
    >
      <UploadIcon size={16} />
    </div>
  );
};

type Props = {
  size: 'sm' | 'md' | 'lg';
};

const getSize = (size: Props['size']) => {
  if (size === 'sm') return 'w-[48px] h-[48px]';

  if (size === 'md') return 'w-[60px] h-[60px]';

  if (size === 'lg') return 'w-[72px] h-[72px]';
};
