'use client';

import { type FC } from 'react';

import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { useBase } from '@/lib/shared/hooks';

import { Button } from '../../ui';

export const SettingsPageLayoutGoBack: FC<Props> = ({ url }) => {
  const base = useBase();

  return (
    <div>
      <Link href={`${base}${url}`}>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 lg:h-9 lg:w-9">
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
};

type Props = {
  url: string;
};
