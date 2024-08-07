import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { generateVariants } from '../utils';

export type VariantContext = {
  options: {
    id: string;
    isEditing: boolean;
    name: string;
    values: string[];
  }[];
  variants: {
    values: string[];
    price: number;
    stock: number;
  }[];
  appendOption: (option?: VariantContext['options'][0]) => void;
  updateOption: (id: string, input: VariantContext['options'][0]) => void;
  removeOption: (id: string) => void;
};

const Context = createContext<VariantContext>({
  options: [],
  variants: [],
  appendOption: () => {},
  updateOption: () => {},
  removeOption: () => {}
});

export const VariantContextProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<VariantContext['options']>([]);
  const [variants, setVariants] = useState<VariantContext['variants']>([]);

  useEffect(() => {
    const generatedVariants = generateVariants(options);

    setVariants(generatedVariants);
  }, [options]);

  const appendOption = (option?: VariantContext['options'][0]) => {
    if (options.length === MAX_OPTIONS_ALLOWED) return;

    if (!option) {
      setOptions([
        ...options,
        {
          id: Math.random().toString(),
          isEditing: true,
          name: '',
          values: ['']
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
    <Context.Provider value={{ options, appendOption, updateOption, removeOption, variants }}>
      {children}
    </Context.Provider>
  );
};

export const useVariantContext = () => useContext(Context);

export const MAX_OPTIONS_ALLOWED = 3;
