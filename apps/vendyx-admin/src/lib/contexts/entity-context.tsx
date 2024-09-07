'use client';

import { createContext, type ReactNode, useContext } from 'react';

type Schema<T> = {
  entity: T;
};

const Context = createContext<Schema<unknown>>({
  entity: null
});

export const EntityProvider = ({ children, entity }: { children: ReactNode; entity: any }) => {
  return <Context.Provider value={{ entity }}>{children}</Context.Provider>;
};

export const useEntityContext = <T,>() => useContext(Context) as Schema<T>;
