import { notFound } from 'next/navigation';

import { ShopService } from '@/api/services';
import { ShopDetailsForm } from '@/lib/shop/components';

export default async function StoreDetailsPage({ params }: { params: Params }) {
  const shop = await ShopService.getBySlug(params.shop);

  if (!shop) {
    notFound();
  }

  return <ShopDetailsForm shop={shop} />;
}

type Params = {
  shop: string;
};
