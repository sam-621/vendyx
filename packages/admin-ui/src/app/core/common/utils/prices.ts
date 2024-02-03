/**
 * Utility function to format a price in cents to a string with the currency symbol
 * @param price Price in cents
 * @returns Price formatted
 *
 * @example
 * ```ts
 * const priceInCents = 1099;
 * const priceFormatted = getFormattedPrice(priceInCents);
 * // priceFormatted = $10.99
 * ```
 */
export const getFormattedPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price / 100);
};
