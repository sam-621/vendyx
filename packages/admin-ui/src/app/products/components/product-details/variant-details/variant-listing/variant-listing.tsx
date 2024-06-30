import { type FC } from 'react';

import { useProductDetailsContext } from '@/app/products/context';

import { VariantListHeader } from './variant-list-header/variant-list-header';
import { VariantList } from './variant-list';

export const VariantListing: FC<Props> = ({ areOptionsInMemory }) => {
  const { product } = useProductDetailsContext();

  return (
    <div className=" flex flex-col">
      <VariantListHeader canShow={Boolean(product?.options.length) || areOptionsInMemory} />

      <div className="flex flex-col">
        <VariantList variants={product?.variants} />
      </div>
    </div>
  );
};

type Props = {
  areOptionsInMemory: boolean;
};
