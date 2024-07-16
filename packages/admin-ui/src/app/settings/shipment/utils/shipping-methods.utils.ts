import { getFormattedPrice } from '@ebloc/common';

export const formatShippingMethodPreviewPrice = (previewPrice: number) => {
  if (previewPrice > 0) return getFormattedPrice(previewPrice);

  if (previewPrice === 0) return 'Free';

  return 'Dynamic';
};
