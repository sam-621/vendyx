'use server';

import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ProductService } from '@/api';
import { getBasePathFormHeaders } from '@/lib/utils';

export const removeProduct = async (id: string) => {
  const isOk = await ProductService.massiveRemove([id]);

  if (!isOk) {
    return { error: 'Failed to remove products' };
  }

  const base = getBasePathFormHeaders(headers());

  revalidateTag(ProductService.Tags.products);
  redirect(`${base}/products`);
};
