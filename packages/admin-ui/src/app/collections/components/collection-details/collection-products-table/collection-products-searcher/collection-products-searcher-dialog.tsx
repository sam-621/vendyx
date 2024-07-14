import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';

import { useGetProducts } from '@/app/products';
import { EntitySearchEmptyState, EntitySearcherDialog } from '@/lib/components';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';
import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

import { useSetProductsInCollectionForm } from './use-set-products-in-collection-form';

export const CollectionProductsSearcherDialog: FC<Props> = ({ collection }) => {
  const productsInCollection = collection.products.items.map(p => p.id) ?? [];

  const { onDone } = useSetProductsInCollectionForm(collection);
  const { products } = useGetProducts();

  return (
    <EntitySearcherDialog
      title="Add products"
      description="Update the products in the collection"
      items={products ?? []}
      defaultSelectedItems={productsInCollection}
      onDone={async selectedIds => {
        const { success } = await onDone(selectedIds);
        return { closeModal: success };
      }}
      item={item => (
        <div className="flex items-center gap-2 w-full">
          <img
            src={item.assets.items.length ? item.assets.items[0].source : DEFAULT_PRODUCT_IMAGE}
            alt={item.name}
            className="h-12 w-12 object-cover rounded-md"
          />
          <span>{item.name}</span>
        </div>
      )}
      trigger={
        <Button type="button" variant="secondary">
          Add products
        </Button>
      }
      emptyState={
        <EntitySearchEmptyState
          title="You have no products"
          description="You can add products by clicking the button below"
          action={
            <Link to="/products/new">
              <Button className="mt-4">Add Product</Button>
            </Link>
          }
        />
      }
    />
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
