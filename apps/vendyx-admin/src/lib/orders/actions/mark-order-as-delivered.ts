'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { OrderService } from '@/api/services';
import { type MarkOrderAsShippedInput } from '@/api/types';

export const markOrderAsShipped = async (orderId: ID, input: MarkOrderAsShippedInput) => {
  const result = await OrderService.markAsShipped(orderId, input);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(OrderService.Tags.order(result.orderId));
};
