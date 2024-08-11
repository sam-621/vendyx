'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { productService, ProductTags } from '@/lib/shared/api';
import { getBasePathFormHeaders } from '@/lib/shared/utils';

export const removeProduct = async (id: string) => {
  const isOk = await productService.massiveRemove([id]);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  const base = getBasePathFormHeaders(headers());

  revalidateTag(ProductTags.products);
  redirect(`${base}/products`);
};
