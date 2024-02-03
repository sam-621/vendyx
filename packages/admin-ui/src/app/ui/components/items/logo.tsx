import { type FC } from 'react';

import { cn } from '@vendyx/theme';
import { CommandIcon } from 'lucide-react';

export const Logo: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center text-lg font-medium', className)}>
      <CommandIcon size={18} />
    </div>
  );
};

type Props = {
  className?: string;
};
