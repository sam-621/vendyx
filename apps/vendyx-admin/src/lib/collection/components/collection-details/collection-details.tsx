import { CollectionGeneralInfoCard, CollectionStatusSwitchCard } from '../collection-details-cards';

export const CollectionDetails = () => {
  return (
    <div className="flex flex-col lg:grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CollectionGeneralInfoCard />

        {/* {collection && <CollectionProductsTable collection={collection} />} */}

        {/* {collection && (
          <div className="flex justify-end">
            <RemoveCollectionButton collection={collection} />
          </div>
        )} */}
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CollectionStatusSwitchCard />
      </div>
    </div>
  );
};
