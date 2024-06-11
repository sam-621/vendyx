import { EblocConfig } from './ebloc.config';

let config: EblocConfig;

export const setConfig = (input?: Partial<EblocConfig>) => {
  if (!input) return;

  config = {
    ...config,
    ...input
  };
};

export const getConfig = () => config;
