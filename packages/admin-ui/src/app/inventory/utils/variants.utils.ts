import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

/**
 * Generate all possible combinations of the given options
 *
 * @param options Options to combine
 * @returns All possible combinations of the Options
 *
 * @explanation
 * The base idea is to combine one by one. For example, if we have 3 options:
 * 1. Color: Red, Blue
 * 2. Size: S, M
 * 3. Material: Cotton, Polyester
 *
 * The first iteration will be
 * combinedOptions: [[]]
 * currentOption: [Red, Blue]
 * result: [[Red], [Blue]]
 *
 * The second iteration will be
 * combinedOptions: [[Red], [Blue]]
 * currentOption: [S, M]
 * result: [[Red, S], [Red, M], [Blue, S], [Blue, M]]
 *
 * The third iteration will be
 * combinedOptions: [[Red, S], [Red, M], [Blue, S], [Blue, M]]
 * currentOption: [Cotton, Polyester]
 * result: [[Red, S, Cotton], [Red, S, Polyester], [Red, M, Cotton], [Red, M, Polyester], [Blue, S, Cotton], [Blue, S, Polyester], [Blue, M, Cotton], [Blue, M, Polyester]]
 *
 * For more detailed and human explanation talk to Sam xd
 */
export const generateOptionCombinations = (options: CommonProductFragment['options']) => {
  if (!options) return [];

  const totalCombinations = options.reduce<string[][]>(
    (combinedOptions, currentOption) => {
      const result: string[][] = [];

      for (const option of combinedOptions) {
        for (const value of currentOption.values ?? []) {
          result.push([...option, value.id]);
        }
      }

      return result;
    },
    [[]]
  );

  return totalCombinations;
};
