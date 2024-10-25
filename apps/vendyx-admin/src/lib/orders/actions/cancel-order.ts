'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { OrderService } from '@/api/services';

export const cancelOrder = async (orderId: ID) => {
  const result = await OrderService.cancel(orderId);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(OrderService.Tags.order(result.orderId));
};
