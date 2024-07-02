import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react';

import { Checkbox, cn, Input } from '@ebloc/theme';

import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

export const ProductsListInCollection: FC<Props> = ({
  allProducts,
  productsInCollection,
  selectedIds,
  setSelectedIds
}) => {
  const [productsInList, setProductsInList] = useState(allProducts);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue === '') {
      setProductsInList(allProducts);
    } else {
      setProductsInList(
        allProducts?.filter(p => p.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
  }, [searchValue, allProducts]);

  const handleCheck = (id: string) => (checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(p => p !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="px-6">
        <Input onChange={e => setSearchValue(e.target.value)} placeholder="Search products" />
      </div>
      <div>
        <div
          className={cn(
            'divide-y border-y h-[calc(80px*2)] lg:h-[calc(80px*5)]',
            (productsInList?.length ?? 0) > 5 && 'overflow-y-scroll'
          )}
        >
          {productsInList?.map(p => (
            <label
              key={p.id}
              htmlFor={`product-${p.id}`}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
            >
              <Checkbox
                id={`product-${p.id}`}
                defaultChecked={productsInCollection.includes(p.id)}
                onCheckedChange={handleCheck(p.id)}
              />
              <div className="flex items-center gap-2 w-full">
                <img
                  src={p.assets.items.length ? p.assets.items[0].source : DEFAULT_PRODUCT_IMAGE}
                  alt={p.name}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <span>{p.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

type Props = {
  allProducts: CommonCollectionFragment['products']['items'];
  productsInCollection: string[];
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
};
