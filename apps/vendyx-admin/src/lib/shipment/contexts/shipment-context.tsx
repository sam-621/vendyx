import {
  type CommonCountryFragment,
  type CommonShippingHandlersFragment,
  type CommonZoneFragment
} from '@/api/types';

export type ShipmentContext = {
  countries: CommonCountryFragment[];
  shippingHandlers: CommonShippingHandlersFragment[];
  zone: CommonZoneFragment;
};
