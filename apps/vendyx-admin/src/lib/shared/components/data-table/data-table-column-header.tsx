import type { Column } from '@tanstack/react-table';

import { cn } from '../../utils';

export const DataTableColumnHeader = <TData, TValue>({
  title,
  className
}: Props<TData, TValue>) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className="text-sm">{title}</span>
    </div>
  );
};

type Props<TData, TValue> = React.HTMLAttributes<HTMLDivElement> & {
  column: Column<TData, TValue>;
  title: string;
};
