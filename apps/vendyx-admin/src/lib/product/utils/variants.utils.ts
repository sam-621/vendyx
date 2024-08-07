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
export const generateVariants = (options: VariantContext['options']): GenerateVariantsReturn => {
  if (!options.length) return [];

  const [firstOption, ...restOptions] = options;

  return firstOption.values.flatMap(value => {
    if (!restOptions.length) return [{ values: [value], price: 0, stock: 0 }];

    const variants = generateVariants(restOptions);

    return variants.map(variant => ({ values: [value, ...variant.values], price: 0, stock: 0 }));
  });
};

type GenerateVariantsReturn = { values: string[]; price: number; stock: number }[];
