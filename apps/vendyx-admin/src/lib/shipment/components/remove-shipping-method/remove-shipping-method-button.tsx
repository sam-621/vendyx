import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api';
import { RemoveEntityButton } from '@/lib/shared/components';

import { useRemoveShippingMethod } from './use-remove-shipping-method';

export const RemoveSHippingMethodButton: FC<Props> = ({ method }) => {
  const { isLoading, removeShippingMethod } = useRemoveShippingMethod();

  return (
    <RemoveEntityButton
      title={`Remove shipping method "${method.name}"`}
      description="You will not be able to accept orders with this shipping method. This action cannot be undone."
      onRemove={() => {
        removeShippingMethod(method.id);
      }}
      isLoading={isLoading}
      trigger="icon"
    />
  );
};

type Props = {
  method: CommonZoneFragment['shippingMethods'][0];
};
