import { isFirst } from '@/lib/shared/utils';
import { type VariantContext } from '../contexts';

/**
 * Generate all possible variants based on the provided options.
 *
 * @example
 * const options = [
 *  { name: 'Color', values: ['Red', 'Blue'] },
 * { name: 'Size', values: ['S', 'M', 'L'] }
 * ];
 *
 * const variants = generateVariants(options);
 *
 * console.log
 * // [
 * //   { values: ['Red', 'S'], price: 0, stock: 0 },
 * //   { values: ['Red', 'M'], price: 0, stock: 0 },
 * //   { values: ['Red', 'L'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'S'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'M'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'L'], price: 0, stock: 0 }
 * // ]
 */
export const generateVariants = (
  options: VariantContext['options'],
  existingVariants: VariantContext['variants']
): GenerateVariantsReturn => {
  if (!options.length) return [];

  const [firstOption, ...restOptions] = options;

  return (
    firstOption.values
      .flatMap(value => {
        if (!restOptions.length)
          return [
            {
              id: Math.random().toString(),
              values: [value],
              price: 0,
              stock: 0,
              selected: false,
              action: 'create'
            }
          ];

        const variants = generateVariants(restOptions, existingVariants);

        return variants.map((variant, i) => {
          return {
            id: Math.random().toString(),
            values: [value, ...variant.values],
            price: 0,
            stock: 0,
            selected: false,
            action: isFirst(i) ? 'update' : 'create'
          };
        });
      })
      // Filter out variants with empty values (this is not allowed)
      .filter(variant => variant.values.filter(v => v.name).length > 0)
  );
};
type GenerateVariantsReturn = VariantContext['variants'];

/**
 * Get all variants grouped by the provided option.
 */
export const getVariantsGroupedByOption = (
  option: VariantContext['options'][0],
  variants: VariantContext['variants']
) => {
  const groups: Record<string, VariantContext['variants'][0][]> = {};

  option?.values?.forEach(v => {
    const variantsWithCurrentValue = variants.filter(variant =>
      variant.values?.map(v => v.id).includes(v.id)
    );

    groups[v.name] = variantsWithCurrentValue;
  });

  return groups;
};

/**
 * Get all option values that are not used in any variant.
 */
export const getUnusedOptionValues = (
  option: VariantContext['options'],
  variants: VariantContext['variants']
) => {
  const usedValues = variants.flatMap(v => v.values.map(v => v.id));
  const unusedValues = option.flatMap(o => o.values).filter(v => !usedValues.includes(v.id));

  return unusedValues;
};
