import { NullToUndefined } from './types';

/**
 * Replace null values with undefined for the given object
 */
export function clean<T extends object>(obj: T): NullToUndefined<T> {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] = value === null ? undefined : value;
    }
  }

  return result as NullToUndefined<T>;
}
