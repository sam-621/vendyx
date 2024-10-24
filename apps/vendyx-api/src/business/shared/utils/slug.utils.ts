import slugify from 'slugify';

/**
 * Format the base to a slug
 *
 * @example
 * const productName = 'Black T-Shirt' // base
 *
 * const productSlug = getSlugBy(productName)
 * console.log(productSlug) // black-t-shirt
 */
export const getSlugBy = (base: string) => {
  return slugify(base, { lower: true });
};
