import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type CommonShopFragment } from '@/api/types';
import { Button } from '@/lib/shared/components';

import { type ShopDetailsFormInput } from './use-shop-details-form';

export const ShopDetailsSubmitButton: FC<Props> = ({ shop }) => {
  const form = useFormContext<ShopDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isLoading = (form as any).isLoading as boolean; // This exists in every form, i just need to add it to the type but i'm lazy
  const hasChanged = values.name !== shop.name;
  const withRequiredValues = Boolean(values.name?.length);

  return (
    <Button isLoading={isLoading} disabled={isLoading || !hasChanged || !withRequiredValues}>
      Save
    </Button>
  );
};

type Props = {
  shop: CommonShopFragment;
};
