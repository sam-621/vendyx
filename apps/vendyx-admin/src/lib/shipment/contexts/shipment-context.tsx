import { type CommonCountryFragment, type CommonShippingHandlersFragment } from '@/api';

export type ShipmentContext = {
  countries: CommonCountryFragment[];
  shippingHandlers: CommonShippingHandlersFragment[];
};
