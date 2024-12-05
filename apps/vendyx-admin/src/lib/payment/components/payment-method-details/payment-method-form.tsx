'use client';

import { type FC } from 'react';

import { type CommonPaymentHandlerFragment, type CommonPaymentMethodFragment } from '@/api/types';
import { SettingsPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { PaymentMethodSubmitButton } from '../payment-method-submit-button';
import { PaymentMethodDetails } from './payment-method-details';
import { usePaymentMethodForm } from './use-payment-method-form';

export const PaymentMethodForm: FC<Props> = ({ handlers, method }) => {
  const form = usePaymentMethodForm(handlers, method);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={method ? method.name : 'Add payment method'}
          subtitle={!method ? 'Add a payment method to start receiving payments.' : undefined}
          backUrl="/settings/payments"
          actions={
            <PaymentMethodSubmitButton
              handlers={handlers}
              isLoading={form.isLoading}
              method={method}
            />
          }
        >
          <PaymentMethodDetails handlers={handlers} method={method} />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  method?: CommonPaymentMethodFragment;
  handlers: CommonPaymentHandlerFragment[];
};
