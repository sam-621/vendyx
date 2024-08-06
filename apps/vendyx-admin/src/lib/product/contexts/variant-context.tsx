import { createContext, useContext } from 'react';

type Schema = {
  options: {
    name: string;
    values: string[];
  }[];
  variants: {
    values: [];
    price: number;
    stock: number;
  }[];
};

const Context = createContext<Schema>({ options: [], variants: [] });

export const VariantContextProvider = Context.Provider;

export const useVariantContext = () => useContext(Context);
