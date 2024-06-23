import { DEFAULT_EBLOC_CONFIG } from './default.config';
import { EblocConfig } from './ebloc.config';

let config: EblocConfig;

export const setConfig = (input?: Partial<EblocConfig>) => {
  if (!input) return;

  config = {
    ...config,
    ...input
  };
};

/**
 * Returns the current configuration.
 */
export const getConfig = () => config ?? DEFAULT_EBLOC_CONFIG;
