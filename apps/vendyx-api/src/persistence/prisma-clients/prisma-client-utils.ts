export const modelHasDeletedAtProperty = (model: string) => {
  return (
    model !== 'VariantOptionValue' &&
    model !== 'ProductOption' &&
    model !== 'ProductAsset' &&
    model !== 'StateZone' &&
    model !== 'Otp'
  );
};
