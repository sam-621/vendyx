import { createContext, type ReactNode, useContext, useState } from 'react';

import { getUnusedOptionValues } from '../utils';

export type VariantContext = {
  options: {
    id: string;
    isEditing: boolean;
    name: string;
    values: { name: string; id: string }[];
  }[];
  variants: {
    id: string;
    values: { name: string; id: string }[];
    price: number;
    stock: number;
    selected: boolean;
  }[];
  updateVariants: (variants: VariantContext['variants']) => void;
  removeVariants: (ids: string[]) => void;
  appendOption: (option?: VariantContext['options'][0]) => void;
  updateOption: (id: string, input: VariantContext['options'][0]) => void;
  removeOption: (id: string) => void;
};

const Context = createContext<VariantContext>({
  options: [],
  variants: [],
  updateVariants: () => {},
  removeVariants: () => {},
  appendOption: () => {},
  updateOption: () => {},
  removeOption: () => {}
});

export const VariantContextProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<VariantContext['options']>([]);
  const [variants, setVariants] = useState<VariantContext['variants']>([]);

  const updateVariants = (variants: VariantContext['variants']) => {
    setVariants(variants);
  };

  const removeVariants = (ids: string[]) => {
    const updatedVariants = variants.filter(v => !ids.includes(v.id));

    const unusedValues = getUnusedOptionValues(options, updatedVariants);
    const newOptions = options
      .map(o => ({
        ...o,
        values: o.values.filter(v => !unusedValues.map(uv => uv.id).includes(v.id))
      }))
      .filter(o => o.values.length);

    setVariants(updatedVariants);
    setOptions(newOptions);
  };

  const appendOption = (option?: VariantContext['options'][0]) => {
    if (options.length === MAX_OPTIONS_ALLOWED) return;

    if (!option) {
      setOptions([
        ...options,
        {
          id: Math.random().toString(),
          isEditing: true,
          name: '',
          values: [{ id: Math.random().toString(), name: '' }]
        }
      ]);

      return;
    }

    setOptions([...options, option]);
  };

  const updateOption = (id: string, input: VariantContext['options'][0]) => {
    const updatedOptions = options.map(o => (o.id === id ? input : o));

    setOptions(updatedOptions);
  };

  const removeOption = (id: string) => {
    const updatedOptions = options.filter(o => o.id !== id);

    setOptions(updatedOptions);
  };

  return (
    <Context.Provider
      value={{
        options,
        appendOption,
        updateOption,
        removeOption,
        variants,
        updateVariants,
        removeVariants
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useVariantContext = () => useContext(Context);

export const MAX_OPTIONS_ALLOWED = 3;
