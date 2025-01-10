'use server';

import { redirect } from 'next/navigation';

import { type CommonListShopFragment } from '@/api/types';
import { setActiveShop } from '@/shared/cookies/cookies';

export const selectShop = (shop: CommonListShopFragment) => {
  setActiveShop({ id: shop.id, slug: shop.slug });
  redirect(`/shops/${shop.slug}`);
};
