import { useParams } from 'react-router-dom';

import { RemoveVariantMutation } from '@/lib/ebloc/mutations';
import { useGqlMutation } from '@/lib/gql';

import { useGetProductDetails } from './use-get-product-details';
import { useRemoveOptionValues } from './use-remove-option-values';

export const useRemoveVariant = () => {
  const { slug } = useParams();
  const { product } = useGetProductDetails(slug ?? '');
  const { removeOptionValues } = useRemoveOptionValues();
  const { mutateAsync } = useGqlMutation(RemoveVariantMutation);

  const removeVariant = async (id: string) => {
    await removeUnusedOptionValues(id);
    const {
      removeVariant: { success }
    } = await mutateAsync({ removeVariantId: id });

    return success;
  };

  const removeUnusedOptionValues = async (variantIdToRemove: string) => {
    const variantsWithoutRemoved =
      product?.variants?.items?.filter(({ id: currentId }) => currentId !== variantIdToRemove) ??
      [];

    const optionValuesInUse = variantsWithoutRemoved
      .map(variant => variant.optionValues)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesInProduct = product?.options
      .map(option => option.values)
      .flat()
      .map(v => v?.id ?? '');

    const optionValuesToDelete = optionValuesInProduct?.filter(
      optionValue => !optionValuesInUse.includes(optionValue)
    );

    if (optionValuesToDelete?.length) {
      await removeOptionValues(optionValuesToDelete);
    }
  };

  return {
    removeVariant
  };
};
