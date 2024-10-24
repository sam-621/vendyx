'use client';

import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type CommonPaymentIntegrationFragment, type CommonPaymentMethodFragment } from '@/api';
import { Button } from '@/lib/shared/components';

import { type PaymentMethodFormInput } from '../payment-method-details/use-payment-method-form';

export const PaymentMethodSubmitButton: FC<Props> = ({ isLoading, method, integrations }) => {
  const form = useFormContext<PaymentMethodFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const integrationSelected = integrations.find(i => i.id === values.integration);

  const metadataHasValues = Object.values(values.metadata ?? {}).length;
  const allMetadataIsFilled =
    Object.values(values.metadata ?? {}).every(value => !!value) &&
    integrationSelected?.metadata.length === Object.values(values.metadata ?? {}).length;

  const metadataHasChanged =
    JSON.stringify(values.metadata) !== JSON.stringify(method?.integrationMetadata);
  const enabledHasChanged = values.enabled !== method?.enabled;

  const formHasChanged = metadataHasChanged || enabledHasChanged;

  return (
    <Button
      disabled={!metadataHasValues || !allMetadataIsFilled || !formHasChanged || isLoading}
      isLoading={isLoading}
      type="submit"
    >
      Save
    </Button>
  );
};

type Props = {
  isLoading: boolean;
  method?: CommonPaymentMethodFragment;
  integrations: CommonPaymentIntegrationFragment[];
};
