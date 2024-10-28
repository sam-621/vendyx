import { type FC } from 'react';

import { PlusIcon } from 'lucide-react';

import { type CommonShopFragment } from '@/api/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';

import { ShopCard } from './shop-card';

export const ShopsList: FC<Props> = ({ shops }) => {
  return (
    <Card className="w-[420px] mx-auto">
      <CardHeader className="flex items-center flex-row justify-between">
        <CardTitle>Shops</CardTitle>
        <Button size="sm" variant="outline">
          <PlusIcon size={16} />
          Create Shop
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        {shops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </CardContent>
    </Card>
  );
};

type Props = {
  shops: CommonShopFragment[];
};
