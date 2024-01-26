export const getParsedSlug = (slug: string) => {
  return slug
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
