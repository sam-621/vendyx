import { createContext, useContext } from 'react';

import { type GetAdminUiConfigQuery } from '@/lib/ebloc/codegen/graphql';

type Context = GetAdminUiConfigQuery['adminUiConfig'];
export type PriceCalculator = Context['priceCalculators'][0];

const ConfigContext = createContext<Context | null>(null);

export const ConfigProvider = ConfigContext.Provider;

export const useConfigContext = () => useContext(ConfigContext);
