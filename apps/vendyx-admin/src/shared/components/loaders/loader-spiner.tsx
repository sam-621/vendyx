import { type FC } from 'react';

import { Loader2Icon } from 'lucide-react';

import { cn } from '@/shared/utils/theme';

export const LoaderSpiner: FC<Props> = ({ className, size = 16 }) => {
  return <Loader2Icon size={size} className={cn('animate-spin', className)} />;
};

type Props = {
  className?: string;
  size?: number;
};
