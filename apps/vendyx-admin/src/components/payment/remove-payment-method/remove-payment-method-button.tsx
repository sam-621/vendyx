'use client';

import { type FC } from 'react';

import { type CommonPaymentMethodFragment } from '@/api';
import { RemoveEntityButton } from '@/components/shared';

import { useRemovePaymentMethod } from './use-remove-payment-method';

export const RemovePaymentMethodButton: FC<Props> = ({ method }) => {
  const { removePaymentMethod, isLoading } = useRemovePaymentMethod();

  return (
    <RemoveEntityButton
      title={`Remove Payment Method "${method.name}"`}
      description={
        <div className="flex flex-col gap-3">
          <span>You will:</span>
          <ul>
            <li>• Stop receiving payments using this method</li>
            <li>• Not be able to make refunds for orders created with this payment method</li>
          </ul>
          <span>This action cannot be undone.</span>
        </div>
      }
      onRemove={async () => await removePaymentMethod(method.id)}
      isLoading={isLoading}
    />
  );
};
type Props = {
  method: CommonPaymentMethodFragment;
};
