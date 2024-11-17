import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonShopFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';

export const useShopDetailsForm = (shop: CommonShopFragment) => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<ShopDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: shop.name,
      shopApiKey: shop.shopApiKey
    }
  });

  async function onSubmit(values: ShopDetailsFormInput) {
    startTransition(async () => {
      console.log(values);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  shopApiKey: z.string().readonly().optional()
});

export type ShopDetailsFormInput = z.infer<typeof schema>;
