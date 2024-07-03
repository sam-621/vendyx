import { createContext, type FC, type PropsWithChildren, useContext, useState } from 'react';

type Variant = {
  sku: string | undefined;
  price: number | undefined;
  stock: number | undefined;
};

type Context = {
  checkedVariants: string[];
  addCheckedVariant: (id: string) => void;
  removeCheckedVariant: (id: string) => void;
  resetCheckedVariants: () => void;

  variantsWithChanges: { id: string; input: Variant }[];
  addVariantWithChanges: (input: { id: string; input: Variant }[]) => void;
  removeVariantWithChanges: (id: string) => void;
  resetVariantsWithChanges: () => void;
};

const VariantDetailsContext = createContext<Context>({
  checkedVariants: [],
  addCheckedVariant: () => {},
  removeCheckedVariant: () => {},
  resetCheckedVariants: () => {},

  variantsWithChanges: [],
  addVariantWithChanges: () => {},
  removeVariantWithChanges: () => {},
  resetVariantsWithChanges: () => {}
});

export const VariantDetailsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [checkedVariants, setCheckedVariants] = useState<string[]>([]);
  const [variantsWithChanges, setVariantsWithChanges] = useState<{ id: string; input: Variant }[]>(
    []
  );

  const addCheckedVariant = (id: string) => {
    setCheckedVariants([...checkedVariants, id]);
  };

  const removeCheckedVariant = (id: string) => {
    setCheckedVariants(checkedVariants.filter(_id => _id !== id));
  };

  const resetCheckedVariants = () => {
    setCheckedVariants([]);
  };

  const addVariantWithChanges = (input: { id: string; input: Variant }[]) => {
    const newVariantsWithChanges = variantsWithChanges.filter(v =>
      input.map(i => i.id).includes(v.id)
    );

    setVariantsWithChanges([...newVariantsWithChanges, ...input]);
  };

  const removeVariantWithChanges = (id: string) => {
    setVariantsWithChanges(variantsWithChanges.filter(v => v.id !== id));
  };

  const resetVariantsWithChanges = () => {
    setVariantsWithChanges([]);
  };

  const useVariants = () => ({
    checkedVariants,
    addCheckedVariant,
    removeCheckedVariant,
    resetCheckedVariants,

    variantsWithChanges,
    addVariantWithChanges,
    removeVariantWithChanges,
    resetVariantsWithChanges
  });

  return (
    <VariantDetailsContext.Provider value={useVariants()}>
      {children}
    </VariantDetailsContext.Provider>
  );
};

export const useVariantsContext = () => useContext(VariantDetailsContext);
