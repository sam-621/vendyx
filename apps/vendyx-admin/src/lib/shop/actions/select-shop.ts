'use server';

import { redirect } from 'next/navigation';

import { type CommonShopFragment } from '@/api/types';
import { setActiveShop } from '@/lib/shared/cookies';

export const selectShop = (shop: CommonShopFragment) => {
  setActiveShop({ id: shop.id, slug: shop.slug });
  redirect(`/shops/${shop.slug}`);
};
