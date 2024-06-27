import { type THashMap } from '@ebloc/common';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

/**
 * Return the new variants that will be created or updated based on the new option. if variant id is present, update the variant, if not, create it.
 * @returns Variants with new option values
 */
export const getNewVariantsByNewOption = (
  existingVariants: CommonProductFragment['variants']['items'],
  newOption: CommonProductFragment['options'][0] | undefined | null
) => {
  if (!newOption) return [];

  const variantsWithOptions = existingVariants.filter(v => v.optionValues?.length);
  const newVariants: { variantId: string | undefined; values: string[] }[] = [];

  for (const variant of variantsWithOptions) {
    // This is the magic part, only one variant will be updated, the others will be new variants
    // This is to persist all variants and not lose any data
    // And also to generate the correct number of new variants
    let isVariantIdAlreadyAdded = false;

    for (const value of newOption.values ?? []) {
      newVariants.push({
        variantId: isVariantIdAlreadyAdded ? undefined : variant.id,
        values: [...(variant.optionValues?.map(v => v.id) ?? []), value.id]
      });

      isVariantIdAlreadyAdded = true;
    }
  }

  return newVariants;
};

/**
 * Get new variants that will be created by new option values.
 * The difference between `getNewVariantsByNewOption` is that this function does not update any variant, only creates new ones.
 * This is why when you just add a new option value to a existing option, it only has to create new variants, not update any.
 */
export const getNewVariantsByNewOptionValues = (
  existingVariants: CommonProductFragment['variants']['items'],
  values: CommonProductFragment['options'][0]['values']
) => {
  if (!values?.length) return [];

  if (!existingVariants.length) {
    return values?.map(v => ({ variantId: undefined, values: [v.id] })) ?? [];
  }

  const newVariants: { variantId: string | undefined; values: string[] }[] = [];

  for (const variant of existingVariants) {
    for (const value of values ?? []) {
      newVariants.push({
        variantId: undefined,
        values: [...(variant.optionValues?.map(v => v.id) ?? []), value.id]
      });
    }
  }

  return newVariants;
};

/**
 * Get variants with duplicated option values. This is useful to delete variants that have the same option values.
 * [a, a, a, b, b, b, c, c, c] => [a, a, b, b, c, c]
 *
 * @param variants Variants to check
 * @param all If true, return all variants with duplicated values, if false, return only the duplicated variants
 */
export const getVariantsWithDuplicatedValues = (
  variants: CommonProductFragment['variants']['items']
) => {
  const set = new Set<string>();

  return variants.filter(v => {
    const optionValues =
      v.optionValues
        ?.map(v => v.value)
        .sort()
        .join() ?? '';

    if (set.has(optionValues)) {
      return true;
    }

    set.add(optionValues);
    return false;
  });
};

/**
 * Remove variants with duplicated option values. This is useful to discard variants that have the same option values.
 * [a, a, a, b, b, b, c, c, c] => [a, b, c]
 */
export const removeVariantsWithDuplicatedOptionValues = (
  variants: CommonProductFragment['variants']['items']
) => {
  const set = new Set<string>();

  return variants.filter(v => {
    const optionValues =
      v.optionValues
        ?.map(v => v.value)
        .sort()
        .join() ?? '';

    if (set.has(optionValues)) {
      return false;
    }

    set.add(optionValues);
    return true;
  });
};

/**
 * Get variants without the given option
 */
export const getVariantsWithoutOptionValues = (
  values: CommonProductFragment['options'][0]['values'],
  variants: CommonProductFragment['variants']['items']
) => {
  const valuesRemoved = values?.map(v => v.id) ?? [];

  return variants.map(v => ({
    ...v,
    optionValues: v.optionValues?.filter(ov => !valuesRemoved.includes(ov.id))
  }));
};

/**
 * Get the variant name based on the option values
 */
export const getVariantName = (
  optionValues: CommonProductFragment['variants']['items'][0]['optionValues']
) => {
  return optionValues?.map(v => v.value).join(' / ');
};

/**
 * Group variants by the given option
 */
export const getVariantsGroupedByOption = (
  option: CommonProductFragment['options'][0],
  variants: CommonProductFragment['variants']['items']
) => {
  const groups: THashMap<CommonProductFragment['variants']['items']> = {};

  option?.values?.forEach(v => {
    const variantsWithCurrentValue = variants.filter(variant =>
      variant.optionValues?.map(v => v.id).includes(v.id)
    );

    groups[v.value] = variantsWithCurrentValue;
  });

  return groups;
};

/**
 * Method to get the option values that are not in use in the product variants. Should be use after a variant has been removed
 *
 * @param product Product your are performing the operation
 * @param variantId Variant id that has been removed
 */
export const getUnusedOptionValues = (product: CommonProductFragment, variantId: string) => {
  const variantsWithoutRemoved =
    product?.variants?.items?.filter(({ id: currentId }) => currentId !== variantId) ?? [];

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

  return optionValuesToDelete ?? [];
};
