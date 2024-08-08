/**
 * Convert formatted price to number
 *
 * @example
 * getFormattedPrice('$1,234.56') // 123456
 */
export const parsePrice = (price: string) => {
  const parsedPrice = price;

  const decimals = Number(price.split('.')[1]);

  if (!decimals) {
    // if decimals are zero, remove them and remove all non-numeric characters (, . $)
    return Number(price.split('.')[0].replace(/[^0-9]/g, ''));
  } else {
    // if decimals are present, remove all non-numeric characters (, and $)
    return Number(parsedPrice.replace(/[^0-9.]/g, ''));
  }
};

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
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
    // Vendyx prices are always in cents
  }).format(price / 100);
};
