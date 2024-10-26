'use server';

import { revalidateTag } from 'next/cache';

import { type ID } from '@/api/scalars';
import { CustomerService } from '@/api/services';
import { type UpdateCustomerInput } from '@/api/types';

export const updateCustomer = async (customerId: ID, input: UpdateCustomerInput) => {
  const result = await CustomerService.update(customerId, input);

  if (!result.success) {
    return { error: result.error };
  }

  revalidateTag(CustomerService.Tags.customer(result.customerId));
};
