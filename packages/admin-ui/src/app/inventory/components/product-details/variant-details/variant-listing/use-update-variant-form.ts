import { useParams } from 'react-router-dom';

import { getFormattedPrice, type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InventoryKeys, useUpdateVariant } from '@/app/inventory/hooks';
import { getVariantName } from '@/app/inventory/utils';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { parseFormattedPrice } from '@/lib/utils';

export const useUpdateVariantForm = (variant: CommonProductFragment['variants']['items'][0]) => {
  const { slug } = useParams();
  const { updateVariant } = useUpdateVariant();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: getFormattedPrice(variant.price).replace('$', '') as unknown as number,
      quantity: variant.stock,
      sku: variant.sku
    }
  });

  const onSubmit = async (input: FormInput) => {
    const variantName = getVariantName(variant.optionValues);

    const variantUpdated = await updateVariant(variant.id, {
      price: input.price,
      sku: input.sku,
      stock: input.quantity
    });

    form.setValue(
      'price',
      getFormattedPrice(variantUpdated?.price ?? input.price * 100).replace(
        '$',
        ''
      ) as unknown as number
    );

    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(slug ?? '') });
    notification.success(`Variant ${variantName} updated`);
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  price: z.preprocess(
    value => Number(parseFormattedPrice(value as string) ?? 0),
    z.number().min(0).optional()
  ),
  quantity: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  sku: z.string()
} satisfies MakeAny<FormInput>);

type FormInput = {
  price: number;
  sku: string;
  quantity: number;
};
