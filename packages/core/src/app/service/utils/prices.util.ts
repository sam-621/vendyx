/**
 * Utility function to convert a price in dollars to cents, this is useful for storing prices in the database as integers and avoiding floating point errors
 * @param price Price in dollar
 * @returns Price in cents
 *
 * @example
 * ```ts
 * const priceInDollars = 10.99;
 * const priceInCents = convertToCent(priceInDollars);
 * // priceInCents = 1099
 * ```
 *
 * @warning This function only has to be called when storing prices in the database or make operations with them, displaying prices in the frontend should use floats.
 */
export const convertToCent = (price: number) => {
  return price * 100;
};

/**
 * Utility function to convert a price in cents to dollars, this is useful for displaying prices in the frontend
 * @param price Price in cents
 * @returns Price in dollars
 *
 * @example
 * ```ts
 * const priceInCents = 1099;
 * const priceInDollars = convertToDollar(priceInCents);
 * // priceInDollars = 10.99
 * ```
 *
 * @warning This function only has to be called when displaying prices in the frontend, operations and storing process should use integers.
 */
export const convertToDollar = (price: number) => {
  return price / 100;
};
