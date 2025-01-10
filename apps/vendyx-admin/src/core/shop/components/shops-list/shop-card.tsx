'use client';

import { type FC, useTransition } from 'react';

import { ChevronRightIcon } from 'lucide-react';

import { type CommonListShopFragment } from '@/api/types';
import { LoaderSpiner } from '@/shared/components/loaders/loader-spiner';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/utils/theme';

import { selectShop } from '../../actions/select-shop';

// When clicking on a shop, we redirect to the shop's page
// But we also need to set the shop id first in the cookies before redirecting
export const ShopCard: FC<Props> = ({ shop }) => {
  const [isLoading, startTransition] = useTransition();
  const firstShopLetter = shop.name.charAt(0).toUpperCase();

  const handleClick = () => {
    startTransition(() => {
      selectShop(shop);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={cn('text-start', isLoading && 'opacity-50')}
    >
      <article className="flex items-center justify-between hover:bg-muted p-3 rounded-md mx-3 transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-foreground flex justify-center items-center rounded-md">
            <span className="text-background">{firstShopLetter}</span>
          </div>
          <div className="flex flex-col gap-1">
            <Label asChild>
              <p>{shop.name}</p>
            </Label>
            <Label asChild className="text-muted-foreground">
              <p>{shop.slug}.com</p>
            </Label>
          </div>
        </div>
        <div>{isLoading ? <LoaderSpiner /> : <ChevronRightIcon size={16} />}</div>
      </article>
    </button>
  );
};

type Props = {
  shop: CommonListShopFragment;
};
