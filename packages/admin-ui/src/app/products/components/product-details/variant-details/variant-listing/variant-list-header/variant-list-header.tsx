import { type FC } from 'react';

import { Label } from '@ebloc/theme';

import { useVariantsContext } from '@/app/products/context';

import { MassiveRemoveVariantButton } from './massive-remove-variant-button';

export const VariantListHeader: FC<Props> = ({ canShow }) => {
  const { checkedVariants } = useVariantsContext();

  if (!canShow) {
    return null;
  }

  return (
    <div className="flex justify-between items-center border-y h-12 px-6">
      <Label>{checkedVariants.length ? `${checkedVariants.length} selected` : 'Variants'}</Label>
      <div>{checkedVariants.length > 0 && <MassiveRemoveVariantButton />}</div>
    </div>
  );
};

type Props = {
  canShow: boolean;
};
