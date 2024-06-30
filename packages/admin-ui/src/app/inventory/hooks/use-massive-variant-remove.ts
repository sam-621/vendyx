import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { getUnusedOptionValues } from '../utils';
import { useCreateVariant } from './use-create-variant';
import { useRemoveOption } from './use-remove-option';
import { useRemoveOptionValues } from './use-remove-option-values';
import { useRemoveVariant } from './use-remove-variant';

export const useMassiveVariantRemove = () => {
  const { removeOptionValues } = useRemoveOptionValues();
  const { removeVariant } = useRemoveVariant();
  const { createVariant } = useCreateVariant();
  const { removeOption } = useRemoveOption();

  const massiveVariantRemove = async (
    variantsToRemove: string[],
    product: CommonProductFragment
  ) => {
    const variants = product.variants.items.filter(variant =>
      variantsToRemove.includes(variant.id)
    );

    let productBeginUpdated = product;

    for (const variant of variants) {
      productBeginUpdated = await removeSingleVariant(variant.id, {
        ...productBeginUpdated
      });
    }
  };

  const removeSingleVariant = async (
    variantId: string,
    product: CommonProductFragment
  ): Promise<CommonProductFragment> => {
    await removeVariant(variantId);

    const optionValuesToRemove = getUnusedOptionValues(product, variantId);
    if (optionValuesToRemove?.length) {
      await removeOptionValues(optionValuesToRemove);
    }

    const productOptions = product?.options ?? [];

    const optionsToRemove = productOptions.filter(option =>
      option.values?.every(value => optionValuesToRemove?.includes(value.id))
    );

    if (optionsToRemove?.length) {
      await Promise.all(optionsToRemove.map(async option => await removeOption(option.id)));
    }

    const newProductOptions = productOptions
      .filter(p => !optionsToRemove.map(pr => pr.id).includes(p.id))
      .map(option => ({
        ...option,
        values: option.values?.filter(value => !optionValuesToRemove?.includes(value.id))
      }));

    const isTheLastVariant = product?.variants?.items?.length === 1;

    if (isTheLastVariant) {
      await createVariant(product.id, {
        price: 0,
        sku: '',
        stock: 0,
        published: true
      });
    }

    return {
      ...product,
      options: newProductOptions,
      variants: {
        ...product.variants,
        items: product.variants.items.filter(variant => variant.id !== variantId)
      }
    };
  };

  return {
    massiveVariantRemove
  };
};
