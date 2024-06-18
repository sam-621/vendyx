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

  const variantsWithOptions = existingVariants.filter(v => v.optionValues?.length);
  const newVariants: { variantId: string | undefined; values: string[] }[] = [];

  for (const variant of variantsWithOptions) {
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
export const getVariantsWithoutOption = (
  option: CommonProductFragment['options'][0],
  variants: CommonProductFragment['variants']['items']
) => {
  const valuesRemoved = option.values?.map(v => v.id) ?? [];

  return variants.map(v => ({
    ...v,
    optionValues: v.optionValues?.filter(ov => !valuesRemoved.includes(ov.id))
  }));
};
