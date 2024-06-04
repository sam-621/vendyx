import { useState } from 'react';

import { useProductDetailsContext } from '@/app/inventory/context';
import { InventoryKeys, useCreateOption, useCreateVariant } from '@/app/inventory/hooks';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { type OptionState } from './use-manage-variants';

// TODO: Hacer q las variantes se puedan crear l;as que sean sin opciones para ya luego actualizarlas con las opciuones generadas
/**
 * Manage the option details form
 */
export const useOptionDetailsForm = () => {
  const { product } = useProductDetailsContext();
  const { createVariant } = useCreateVariant();
  const { createOption } = useCreateOption();
  const [isLoading, setIsLoading] = useState(false);

  const createVariantsCombinations = async (option: OptionState) => {
    if (!product) {
      notification.error('You should create a product first');
      return;
    }

    const optionValues = option.values.filter(v => v.value);

    if (option.name.trim() === '') {
      notification.error('Please add a name to the option');
      return;
    }

    if (!optionValues.length) {
      notification.error(`Please add at least one value to the option ${option.name}`);
      return;
    }

    setIsLoading(true);
    const notificationId = notification.loading('Creating variants...');

    const optionCreated = await createOption({
      name: option.name,
      values: optionValues.map(v => v.value)
    });

    const variantsAlreadyCreated = product.variants?.items;

    const variantPromises =
      optionCreated.values?.map(
        async value =>
          await createVariant(product?.id, {
            price: 0,
            published: true,
            sku: '',
            stock: 0,
            optionValuesIds: [value.id]
          })
      ) ?? [];

    await Promise.all(variantPromises);
    await queryClient.invalidateQueries({ queryKey: InventoryKeys.single(product.slug) });

    setIsLoading(false);

    notification.dismiss(notificationId);
    notification.success('Variants created successfully');
  };

  return {
    isLoading,
    createVariantsCombinations
  };
};
