import { createContext, useContext } from 'react';

import { type AdminUiConfig } from '@/lib/ebloc/rest';

type Context = AdminUiConfig;

const ConfigContext = createContext<Context>({
  branding: {
    name: '',
    description: ''
  },
  extraUiModules: []
});

export const ConfigProvider = ConfigContext.Provider;

export const useConfigContext = () => useContext(ConfigContext);
