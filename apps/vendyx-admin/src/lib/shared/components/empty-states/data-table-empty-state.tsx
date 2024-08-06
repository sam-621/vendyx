import { type FC } from 'react';

import Link from 'next/link';

import { Button } from '../ui';

export const DataTableEmptyState: FC<Props> = ({ title, description, action }) => {
  return (
    <div className="w-full h-full border border-dashed rounded-lg flex flex-col justify-center items-center gap-6 bg-background">
      <div className="flex flex-col gap-1">
        <h3 className="h3 text-center">{title}</h3>
        {description && <p className="muted text-center text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <div>
          <Link href={action.to}>
            <Button>{action.label}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

type Props = {
  title: string;
  description?: string;
  action?: {
    label: string;
    to: string;
  };
};
