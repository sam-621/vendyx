import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';

import { CollectionAssetUploader } from '../collection-asset-uploader';
import { CollectionGeneralInfoCard, CollectionStatusSwitchCard } from '../collection-details-cards';
import { CollectionProductsTable } from '../collection-products-table';

export const CollectionDetails: FC<Props> = ({ collection }) => {
  return (
    <div className="flex flex-col lg:grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CollectionGeneralInfoCard />

        {collection && <CollectionProductsTable collection={collection} />}

        {/* {collection && (
          <div className="flex justify-end">
            <RemoveCollectionButton collection={collection} />
          </div>
        )} */}
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CollectionStatusSwitchCard />
        <CollectionAssetUploader collection={collection} />
      </div>
    </div>
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
