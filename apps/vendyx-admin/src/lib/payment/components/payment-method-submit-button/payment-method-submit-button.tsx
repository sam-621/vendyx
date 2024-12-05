'use client';

import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type CommonPaymentHandlerFragment, type CommonPaymentMethodFragment } from '@/api/types';
import { Button } from '@/lib/shared/components';

import { type PaymentMethodFormInput } from '../payment-method-details/use-payment-method-form';

export const PaymentMethodSubmitButton: FC<Props> = ({ isLoading, method, handlers }) => {
  const form = useFormContext<PaymentMethodFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const handlerSelected = handlers.find(i => i.code === values.handlerCode);

  const metadataHasValues = Object.values(values.args ?? {}).length;
  const allMetadataIsFilled =
    Object.values(values.args ?? {}).every(value => !!value) &&
    Object.values(handlerSelected?.args ?? {}).length === Object.values(values.args ?? {}).length;

  const metadataHasChanged = JSON.stringify(values.args) !== JSON.stringify(method?.args);
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
  handlers: CommonPaymentHandlerFragment[];
};
