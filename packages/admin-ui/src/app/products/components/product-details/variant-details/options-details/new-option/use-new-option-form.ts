import { useState } from 'react';

import { useProductDetailsContext } from '@/app/products/context';
import {
  ProductKeys,
  useCreateOption,
  useCreateVariant,
  useRemoveVariant,
  useUpdateVariant
} from '@/app/products/hooks';
import { getNewVariantsByNewOption } from '@/app/products/utils';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { type OptionState } from '../use-manage-options';

/**
 * Manage the option details form
 */
export const useNewOptionForm = () => {
  const { product } = useProductDetailsContext();
  const { createVariant } = useCreateVariant();
  const { removeVariant } = useRemoveVariant();
  const { updateVariant } = useUpdateVariant();
  const { createOption } = useCreateOption();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (option: OptionState, closeOptionForm: () => void) => {
    if (!product) {
      notification.error('You should create a product first');
      return;
    }

    const optionValues = option.values.filter(v => v.value);

    if (option.name.trim() === '') {
      notification.error('Please add a name to the option');
      return;
    }

    const isOptionNameDuplicated = product.options.some(op => op.name === option.name);
    if (isOptionNameDuplicated) {
      notification.error(`You already have an option called "${option.name}"`);
      return;
    }

    if (!optionValues.length) {
      notification.error(`Please add at least one value to the option ${option.name}`);
      return;
    }

    if (optionValues.length !== new Set(optionValues.map(v => v.value)).size) {
      notification.error('You can not have duplicated option values');
      return;
    }

    setIsLoading(true);
    const notificationId = notification.loading('Creating variants...');

    const { option: optionCreated, error } = await createOption({
      name: option.name,
      values: optionValues.map(v => v.value)
    });

    if (error) {
      notification.error(error);
      notification.dismiss(notificationId);
      return;
    }

    const variantsToUpdate = product.variants.items.filter(v => v.optionValues?.length);
    const newVariants = variantsToUpdate.length
      ? getNewVariantsByNewOption(variantsToUpdate, optionCreated)
      : [];

    if (newVariants.length) {
      for (const variant of newVariants) {
        const { variantId, values } = variant;

        // If the variantId is not present, it means that we need to create a new variant
        if (!variantId) {
          await createVariant(product.id, {
            price: 0,
            published: true,
            sku: '',
            stock: 0,
            optionValuesIds: values
          });
          continue;
        }

        await updateVariant(variantId, {
          optionValuesIds: values
        });
      }
    } else {
      // If not this means that the product has no variants yet, so we only need to create them
      await Promise.all(
        optionCreated?.values?.map(
          async value =>
            await createVariant(product.id, {
              price: 0,
              published: true,
              sku: '',
              stock: 0,
              optionValuesIds: [value.id]
            })
        ) ?? []
      );
    }

    const variantsWithNoOptionValues = product.variants.items.filter(v => !v.optionValues?.length);
    await Promise.all(variantsWithNoOptionValues.map(async v => await removeVariant(v.id)));

    await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product.slug) });

    setIsLoading(false);

    notification.dismiss(notificationId);
    notification.success('Variants created successfully');
    closeOptionForm();
  };

  return {
    isLoading,
    onSubmit
  };
};
