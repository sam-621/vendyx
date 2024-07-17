import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonPaymentMethodFragment } from '@/lib/ebloc/codegen/graphql';

import { type PaymentMethodDetailsFormInput } from './payment-method-details/use-payment-method-details-form';

export const PaymentMethodDetailsSubmitButton: FC<Props> = ({ paymentMethod }) => {
  const form = useFormContext<PaymentMethodDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !isFormDirty(paymentMethod, values as PaymentMethodDetailsFormInput);
  const isLoading = form.formState.isSubmitting;

  return (
    <Button disabled={isDisabled || isLoading} isLoading={isLoading} type="submit">
      Save
    </Button>
  );
};

const isFormDirty = (
  method: CommonPaymentMethodFragment,
  formInput: PaymentMethodDetailsFormInput
) => {
  const formattedMethod: PaymentMethodDetailsFormInput = {
    name: method.name,
    description: method.description ?? '',
    handler: method.handler.code,
    enabled: method.enabled
  };

  return Object.keys(formInput).some(key => {
    return ((formattedMethod as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  paymentMethod: CommonPaymentMethodFragment;
};
