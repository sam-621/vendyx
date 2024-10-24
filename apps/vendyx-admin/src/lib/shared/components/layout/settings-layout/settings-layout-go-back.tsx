'use client';

import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '../../ui';

export const SettingsLayoutGoBack = () => {
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  return (
    <Link href={`/shops/${shop}/products`}>
      <Button size="icon" variant="secondary">
        <XIcon size={16} />
      </Button>
    </Link>
  );
};
