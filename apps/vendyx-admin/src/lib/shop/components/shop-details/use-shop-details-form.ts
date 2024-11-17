import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonShopFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { updateShop } from '../../actions/update-shop';

export const useShopDetailsForm = (shop: CommonShopFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ShopDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: shop.name,
      shopApiKey: shop.shopApiKey
    }
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Shop updated successfully');
      setIsSuccess(false);
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(values: ShopDetailsFormInput) {
    startTransition(async () => {
      await updateShop(shop.slug, values);
      setIsSuccess(true);
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
