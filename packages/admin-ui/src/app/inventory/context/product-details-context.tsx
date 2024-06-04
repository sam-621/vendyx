import { createContext, useContext } from 'react';

import { type CommonProductFragment } from '@/lib/vendyx/codegen/graphql';

type Context = {
  product: CommonProductFragment | null | undefined;
};

const ProductDetailsContext = createContext<Context>({
  product: null
});

export const ProductDetailsProvider = ProductDetailsContext.Provider;

export const useProductDetailsContext = () => useContext(ProductDetailsContext);
