import { type CommonCountryFragment } from '@/api';
import { formatPrice } from '@/lib/shared/utils';

export const isStateInCountry = (
  state: CommonCountryFragment['states'][0],
  country: CommonCountryFragment
) => {
  return country.states.some(s => s.id === state.id);
};

export const formatShippingMethodPreviewPrice = (previewPrice: number) => {
  if (previewPrice > 0) return formatPrice(previewPrice);

  if (previewPrice === 0) return 'Free';

  return 'Dynamic';
};
