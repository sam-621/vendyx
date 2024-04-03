import { VendyxConfig } from './vendyx.config';

let config: VendyxConfig;

export const setConfig = (input?: Partial<VendyxConfig>) => {
  if (!input) return;

  config = {
    ...config,
    ...input,
  };
};

export const getConfig = () => config;
