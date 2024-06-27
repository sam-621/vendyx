import { useFragment } from '@/lib/ebloc/codegen';
import { type CommonProductFragment, CommonProductFragmentDoc } from '@/lib/ebloc/codegen/graphql';
import { getProductErrorMessages } from '@/lib/ebloc/errors';
import { RemoveProductMutation } from '@/lib/ebloc/mutations';
import { GetProductDetailsQuery } from '@/lib/ebloc/queries';
import { useGqlMutation } from '@/lib/gql';
import { gqlFetcher } from '@/lib/gql/gql-fetcher';

import { getUnusedOptionValues } from '../utils';
import { useRemoveOption } from './use-remove-option';
import { useRemoveOptionValues } from './use-remove-option-values';
import { useRemoveVariant } from './use-remove-variant';

export const useRemoveProduct = () => {
  const { mutateAsync, isPending } = useGqlMutation(RemoveProductMutation);

  const { removeOptionValues } = useRemoveOptionValues();
  const { removeVariant } = useRemoveVariant();
  const { removeOption } = useRemoveOption();

  const removeProduct = async (slug: string) => {
    const result = await gqlFetcher(GetProductDetailsQuery, { slug });
    const product = useFragment(CommonProductFragmentDoc, result.product);

    if (!product) {
      return 'The product does not exist. Please refresh the page.';
    }

    const variants = product?.variants?.items ?? [];

    let productBeginUpdated = product;
    for (const variant of variants) {
      productBeginUpdated = await removeSingleVariant(variant.id, {
        ...productBeginUpdated
      });
    }

    const {
      removeProduct: { apiErrors }
    } = await mutateAsync({ productId: product?.id });

    const errorMessage = getProductErrorMessages(apiErrors[0]);

    return errorMessage;
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
    removeProduct,
    isLoading: isPending
  };
};
