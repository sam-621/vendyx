import { createContext, useContext } from 'react';

import { type AdminUiConfig } from '@/lib/ebloc/rest';

type Context = AdminUiConfig;

const ConfigContext = createContext<Context>({
  brand: {
    name: 'Ebloc',
    description:
      "A functional and scalable minimal e-commerce admin that can be adjusted to any user's requirement.",
    logoUrl: ''
  },
  serveUrl: ''
});

export const ConfigProvider = ConfigContext.Provider;

export const useConfigContext = () => useContext(ConfigContext);
