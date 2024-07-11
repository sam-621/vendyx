import { createContext, useContext } from 'react';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

type Context = {
  country: CommonCountryFragment | undefined;
};

const CountryDetailsContext = createContext<Context>({
  country: undefined
});

export const CountryDetailsProvider = CountryDetailsContext.Provider;

export const useCountryDetailsContext = () => useContext(CountryDetailsContext);
