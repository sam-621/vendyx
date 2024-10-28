import { type FC } from 'react';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { type CommonShopFragment } from '@/api/types';

export const ShopCard: FC<Props> = ({ shop }) => {
  const firstShopLetter = shop.name.charAt(0).toUpperCase();
  return (
    <Link href={`/shops/${shop.slug}`}>
      <article className="flex items-center justify-between hover:bg-muted p-3 rounded-md mx-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-foreground flex justify-center items-center rounded-md">
            <span className="text-background">{firstShopLetter}</span>
          </div>
          <div>
            <p>{shop.name}</p>
            <p className="text-muted-foreground">{shop.slug}.com</p>
          </div>
        </div>
        <div>
          <ChevronRightIcon size={16} />
        </div>
      </article>
    </Link>
  );
};

type Props = {
  shop: CommonShopFragment;
};
