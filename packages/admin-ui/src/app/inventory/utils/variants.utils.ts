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

export const getVariantsWithDuplicatedOptionValues = (
  variants: CommonProductFragment['variants']['items']
) => {
  const set = new Set<string>();

  return variants.filter(v => {
    const optionValues =
      v.optionValues
        ?.map(v => v.id)
        .sort()
        .join() ?? '';

    if (set.has(optionValues)) {
      return true;
    }

    set.add(optionValues);
    return false;
  });
};

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
