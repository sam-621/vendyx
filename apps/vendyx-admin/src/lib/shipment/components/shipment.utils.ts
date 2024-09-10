import { type CommonCountryFragment } from '@/api';

export const isStateInCountry = (
  state: CommonCountryFragment['states'][0],
  country: CommonCountryFragment
) => {
  return country.states.some(s => s.id === state.id);
};
