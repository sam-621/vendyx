import { useProductDetailsContext } from '@/app/products/context';
import {
  ProductKeys,
  useAddOptionValues,
  useCreateVariant,
  useRemoveOption,
  useRemoveOptionValues,
  useRemoveVariant,
  useUpdateOption,
  useUpdateOptionValues
} from '@/app/products/hooks';
import {
  getNewVariantsByNewOptionValues,
  getVariantsWithDuplicatedValues,
  getVariantsWithoutOptionValues,
  removeVariantsWithDuplicatedOptionValues
} from '@/app/products/utils';
import { useFragment } from '@/lib/ebloc/codegen';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import {
  CommonProductFragment as CommonProductFragmentDoc,
  GetProductDetailsQuery
} from '@/lib/ebloc/queries';
import { gqlFetcher } from '@/lib/gql/gql-fetcher';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { OptionValueState, useManageOptionsStates } from '../use-manage-options';

export const useUpdateOptionForm = (
  option: CommonProductFragment['options'][0],
  onFinish: () => void
) => {
  const { product } = useProductDetailsContext();
  const { removeOption } = useRemoveOption();
  const { removeVariant } = useRemoveVariant();
  const { addOptionValues } = useAddOptionValues();
  const { createVariant } = useCreateVariant();
  const { updateOption } = useUpdateOption();
  const { updateOptionValues } = useUpdateOptionValues();
  const { removeOptionValues } = useRemoveOptionValues();

  const state = useManageOptionsStates([
    {
      id: option.id,
      name: option.name,
      values: [
        ...(option.values?.map(v => ({ id: v.id, value: v.value })) ?? []),
        new OptionValueState()
      ]
    }
  ]);

  /**
   * Remove the option and its values from the product
   *
   * @description
   * 1. Remove the option
   * 2. Remove the duplicated variants (variants with the same option values)
   *    This is necessary because more than 1 variant cannot have the same option values
   *    This scenario can happen when for example we got [s/red, s/green, m/red, m/green]
   *    And we remove the option color (red, green), the result should be:
   *    [s, s, m, m] because we removed the option values red and green but the other values are still present
   *    So in this case we remove the duplicated variants
   * 3. If all variants were removed, create a new variant with default values
   *    This is needed because orders work with variants, so we need at least 1 variant per product
   */
  const onRemove = async () => {
    const variantsWithoutOption = getVariantsWithoutOptionValues(
      option.values,
      product?.variants?.items ?? []
    );
    const duplicatedVariants = getVariantsWithDuplicatedValues(variantsWithoutOption);

    await Promise.all(duplicatedVariants.map(async v => await removeVariant(v.id)));
    await removeOption(option.id);

    const allVariantsWereRemoved = duplicatedVariants.length === product?.variants?.items?.length;

    if (allVariantsWereRemoved) {
      await createDefaultVariant();
    }

    await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product?.slug ?? '') });

    onFinish();
    notification.success('Option removed successfully');
  };

  /**
   * Update option name and add/remove values
   *
   * @description
   * 1. Remove values (if any) from the option
   * 2. If all values were removed and no new values were added, remove the option
   * 3. If not, just remove the values deleted
   * 4. Add new values (if any) to the option
   * 5. If values were added or removed, remove variants with inconsistent option values
   * 6. Update the option values (if any)
   * 7. Update the option
   * 8. Invalidate the product query
   */
  const onUpdate = async () => {
    const newOption = state.options[0];

    const newOptionValues = newOption.values.filter(v => v.value);
    const oldOptionValues = option.values ?? [];

    const valuesToCreate =
      newOptionValues.filter(v => !oldOptionValues.map(v => v.id).includes(v.id)) ?? [];
    const valuesToRemove =
      oldOptionValues?.filter(v => !newOptionValues.map(v => v.id).includes(v.id)) ?? [];

    if (valuesToRemove.length) {
      const allValuesWereRemoved =
        valuesToRemove.length === oldOptionValues.length && !valuesToCreate.length;

      if (allValuesWereRemoved) {
        await onRemove();
      } else {
        await onOptionValuesRemove(valuesToRemove);
      }
    }

    if (valuesToCreate.length) {
      await onOptionValuesCreate(valuesToCreate.map(v => v.value));
    }

    const optionValuesWereModified = valuesToCreate.length || valuesToRemove.length;
    if (optionValuesWereModified) {
      await removeInconsistentVariants();
    }

    const optionValuesToUpdate = newOptionValues.filter(
      v =>
        oldOptionValues.find(o => o.id === v.id) &&
        oldOptionValues.find(o => o.id === v.id)?.value !== v.value
    );
    if (optionValuesToUpdate.length) {
      await updateOptionValues(optionValuesToUpdate.map(v => ({ id: v.id, value: v.value })));
    }

    const optionNameWasModified = newOption.name !== option.name;
    if (optionNameWasModified) {
      await updateOption(option.id, { name: newOption.name });
    }

    const anyChangeWasMade =
      optionValuesWereModified || optionNameWasModified || optionValuesToUpdate.length;
    if (anyChangeWasMade) {
      await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product?.slug ?? '') });
      notification.success('Option updated');
    }

    onFinish();
  };

  /**
   * Remove some option values from the option
   *
   * @description
   * 1. Remove the option values
   * 2. Remove variants with inconsistent option values
   *
   * @param values The values to remove
   */
  const onOptionValuesRemove = async (values: CommonProductFragment['options'][0]['values']) => {
    const variantsWithoutOption = getVariantsWithoutOptionValues(
      values,
      product?.variants.items ?? []
    );

    values?.length && (await removeOptionValues(values.map(v => v.id)));
    await removeVariantsWithInconsistentOptionValues(variantsWithoutOption);
  };

  /**
   * Create some values on the option
   *
   * @description
   * 1. Add the option values
   * 2. Create new variants with the new option values
   *
   * @param values The values to create
   */
  const onOptionValuesCreate = async (values: string[]) => {
    const { values: valuesCreated } = await addOptionValues(option.id, values);
    const newValues =
      valuesCreated?.filter(v => !option.values?.map(v => v.id).includes(v.id)) ?? [];

    const variantsWithOptionValues =
      product?.variants.items.filter(v => v.optionValues?.length) ?? [];

    const variantsFromOtherOptions = getVariantsWithoutOptionValues(
      option.values,
      variantsWithOptionValues
    );

    const newVariants = getNewVariantsByNewOptionValues(
      removeVariantsWithDuplicatedOptionValues(variantsFromOtherOptions) ?? [],
      newValues
    );

    await Promise.all(
      newVariants.map(async variant => {
        const { values } = variant;
        return await createVariant(product?.id ?? '', {
          price: 0,
          published: true,
          sku: '',
          stock: 0,
          optionValuesIds: values
        });
      })
    );
  };

  /**
   * Remove variants with inconsistent option values
   *
   * @description
   * When adding or removing option values, we can end up with variants that have less option values than the others
   * For example
   * variant 1 [s, red]
   * variant 2 [s, green]
   *
   * and wee remove the value red, the result should be
   * variant 1 [s]
   * variant 2 [s, green]
   *
   * So we need to remove the variant 1
   *
   * 1. Get the max number of option values in the current variants
   * 2. Get the variants with less option values than the max
   * 3. Remove the variants with less option values
   *
   * @param variants variants to check
   * @returns variants removed
   */
  const removeVariantsWithInconsistentOptionValues = async (
    variants: CommonProductFragment['variants']['items']
  ) => {
    let maxNumberOfOptionValue = 0;
    variants.forEach(v => {
      if (Number(v.optionValues?.length) > maxNumberOfOptionValue) {
        maxNumberOfOptionValue = v.optionValues?.length ?? 0;
      }
    });

    const variantsWithLessOptionValues = variants.filter(
      v => Number(v.optionValues?.length) < maxNumberOfOptionValue
    );

    await Promise.all(variantsWithLessOptionValues.map(async v => await removeVariant(v.id)));

    return variantsWithLessOptionValues;
  };

  const removeVariantWithNoOptionValues = async (
    variants: CommonProductFragment['variants']['items']
  ) => {
    const variantsWithoutOptionValues = variants?.filter(v => !v.optionValues?.length);
    await Promise.all(variantsWithoutOptionValues.map(async v => await removeVariant(v.id)));

    return variantsWithoutOptionValues;
  };

  /**
   * Create a default variant
   *
   * @description
   * When removing all variants, we need to create a new one with default values.
   * This is needed because orders work with variants, so we need at least 1 variant per product
   */
  const createDefaultVariant = async () => [
    await createVariant(product?.id ?? '', {
      price: 0,
      sku: '',
      stock: 0,
      published: true
    })
  ];

  /**
   * Remove any variant with inconsistent data, repeated values or with no values
   *
   * @description
   * 1. Get the updated product
   * 2. Remove variants with inconsistent option values
   * 3. Remove variants with no option values
   * 4. If all variants were removed, create default variant
   */
  const removeInconsistentVariants = async () => {
    const updatedResult = await gqlFetcher(GetProductDetailsQuery, { slug: product?.slug ?? '' });
    const productUpdated = useFragment(CommonProductFragmentDoc, updatedResult.product);

    const variantsRemoved1 = await removeVariantsWithInconsistentOptionValues(
      productUpdated?.variants.items ?? []
    );
    const variantsRemoved2 = await removeVariantWithNoOptionValues(
      productUpdated?.variants.items ?? []
    );
    const totalVariantsRemoved = new Set([
      ...variantsRemoved1.map(v => v.id),
      ...variantsRemoved2.map(v => v.id)
    ]);

    const allVariantsWereRemoved =
      totalVariantsRemoved.size === productUpdated?.variants.items?.length;

    if (allVariantsWereRemoved) {
      await createDefaultVariant();
    }
  };

  return {
    state,
    onUpdate,
    onRemove
  };
};
