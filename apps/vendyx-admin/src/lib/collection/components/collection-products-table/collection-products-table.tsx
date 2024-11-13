import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { Button, ItemsTable } from '@/lib/shared/components';
import { useBase } from '@/lib/shared/hooks';

import { CollectionProductsTableRow } from './collection-products-table-row';
import { useCollectionProductsTable } from './use-collection-products-table';

export const CollectionProductsTable: FC<Props> = ({ collection }) => {
  const base = useBase();
  const { products, isLoading, fetchProducts } = useCollectionProductsTable(collection.id);

  return (
    <ItemsTable
      title="Products"
      headers={['Product', 'Status']}
      items={products}
      isLoading={isLoading}
      onChange={async (page, search) => await fetchProducts(page, search)}
      renderRow={product => (
        <CollectionProductsTableRow key={product.id} product={product} base={base} />
      )}
      action={
        <Button variant="ghost" size="sm">
          Add products
        </Button>
      }
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
