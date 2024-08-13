'use client';

import { type FC } from 'react';

import { type CommonPaymentIntegrationFragment } from '@/lib/shared/api';
import { Button, SettingsPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { PaymentMethodDetails } from './payment-method-details';
import { usePaymentMethodForm } from './use-payment-method-form';

export const PaymentMethodForm: FC<Props> = ({ integrations }) => {
  const form = usePaymentMethodForm(integrations);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Add payment method"
          subtitle="Add a payment method to start receiving payments."
          backUrl="/settings/payments"
          actions={
            <Button isLoading={form.isLoading} type="submit">
              Save
            </Button>
          }
        >
          <PaymentMethodDetails integrations={integrations} />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  integrations: CommonPaymentIntegrationFragment[];
};
