/**
 * Utility function to parse a slug
 * @param slug Slug to parse
 * @returns Parsed slug with kebab case and without accents
 *
 * @example
 * ```ts
 * const slug = 'This is a slug';
 * const parsedSlug = getParsedSlug(slug);
 * // parsedSlug = 'this-is-a-slug'
 * ```
 */
export const getParsedSlug = (slug: string) => {
  return slug
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
