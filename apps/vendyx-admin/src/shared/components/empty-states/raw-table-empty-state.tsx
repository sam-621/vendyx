'use client';

import { type FC, type ReactElement } from 'react';

import Link from 'next/link';

import { useBase } from '@/shared/hooks/use-base';

import { Button } from '../ui/button';

export const RawTableEmptyState: FC<Props> = ({ illustration, action, description }) => {
  const base = useBase();

  return (
    <div className="w-full h-full border border-dashed rounded-lg flex flex-col justify-center items-center gap-6 bg-background p-6">
      <div className="flex flex-col items-center gap-3">
        {illustration}
        {description && (
          <p className="muted text-center text-muted-foreground max-w-md">{description}</p>
        )}
      </div>
      {action && (
        <div>
          <Link href={`${base}${action.href}`}>
            <Button>{action.label}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

type Props = {
  illustration: ReactElement;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
};
