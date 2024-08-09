export const modelHasDeletedAtProperty = (model: string) => {
  return model !== 'VariantOptionValue' && model !== 'ProductOption';
};
