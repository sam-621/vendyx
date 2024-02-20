export const isFullyArray = <T>(array: T[] | undefined[]): array is T[] => {
  return Array.isArray(array) && array.length > 0;
};
