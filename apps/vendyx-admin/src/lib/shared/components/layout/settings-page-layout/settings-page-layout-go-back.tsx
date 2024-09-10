'use client';

import { type FC } from 'react';

import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '../../ui';

export const SettingsPageLayoutGoBack: FC<Props> = ({ url }) => {
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  return (
    <div>
      <Link href={`/shops/${shop}${url}`}>
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
