import { type FC } from 'react';

import { useProductDetailsContext } from '@/app/inventory/context';

import { VariantList } from './variant-list';
import { VariantListingHeader } from './variant-listing-header';

export const VariantListing: FC<Props> = ({ areOptionsInMemory }) => {
  const { product } = useProductDetailsContext();

  return (
    <>
      <VariantListingHeader canShow={Boolean(product?.options.length) || areOptionsInMemory} />

      <div className="flex flex-col gap-4">
        <VariantList variants={product?.variants} />
      </div>
    </>
  );
};

type Props = {
  areOptionsInMemory: boolean;
};
