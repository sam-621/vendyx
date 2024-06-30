import { createContext, useContext } from 'react';

import {
  type OptionState,
  type OptionValueState
} from '../components/product-details/variant-details/options-details/use-manage-options';

type Context = {
  options: OptionState[];
  addOption: () => void;
  removeOption: (id: string) => void;
  updateOption: (id: string, name: string) => void;
  updateValues: (optionId: string, newOptionValues: OptionValueState[]) => void;
};

const OptionDetailsContext = createContext<Context>({
  options: [],
  addOption: () => {},
  removeOption: () => {},
  updateOption: () => {},
  updateValues: () => {}
});

export const OptionDetailsProvider = OptionDetailsContext.Provider;

export const useOptionDetailsContext = () => useContext(OptionDetailsContext);
