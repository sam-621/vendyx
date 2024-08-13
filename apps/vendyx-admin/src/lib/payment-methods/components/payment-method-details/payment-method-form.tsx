'use client';

import { type FC } from 'react';

import {
  type CommonPaymentIntegrationFragment,
  type CommonPaymentMethodFragment
} from '@/lib/shared/api';
import { Button, SettingsPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { PaymentMethodDetails } from './payment-method-details';
import { usePaymentMethodForm } from './use-payment-method-form';

export const PaymentMethodForm: FC<Props> = ({ integrations, method }) => {
  const form = usePaymentMethodForm(integrations, method);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={method ? method.name : 'Add payment method'}
          subtitle={!method ? 'Add a payment method to start receiving payments.' : undefined}
          backUrl="/settings/payments"
          actions={
            <Button isLoading={form.isLoading} type="submit">
              Save
            </Button>
          }
        >
          <PaymentMethodDetails integrations={integrations} method={method} />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  method?: CommonPaymentMethodFragment;
  integrations: CommonPaymentIntegrationFragment[];
};
