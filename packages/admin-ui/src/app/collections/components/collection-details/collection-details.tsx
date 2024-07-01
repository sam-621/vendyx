import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/lib/ebloc/codegen/graphql';

import { CollectionGeneralInfo } from './collection-general-info/collection-general-info';
import { CollectionProductsTable } from './collection-products-table/collection-products-table';
import { CollectionVisibility } from './collection-visibility/collection-visibility';

export const CollectionDetails: FC<Props> = ({ collection }) => {
  const products = collection.products.items ?? [];

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CollectionGeneralInfo />

        <CollectionProductsTable products={products} />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CollectionVisibility />
      </div>
    </div>
  );
};

type Props = {
  collection: CommonCollectionFragment;
};
