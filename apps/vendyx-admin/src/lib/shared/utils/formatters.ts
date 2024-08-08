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
