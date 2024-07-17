import { FormProvider } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { SettingsPageLayout } from '@/lib/components';

import { PaymentMethodDetails } from '../components/payment-method-details/payment-method-details';
import { usePaymentMethodDetailsForm } from '../components/payment-method-details/use-payment-method-details-form';

export const CreatePaymentMethodPage = () => {
  const form = usePaymentMethodDetailsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Add payment method"
          subtitle="Add a payment method to start receiving payments."
          backUrl="/settings/payments"
          actions={
            <Button type="submit" isLoading={form.formState.isSubmitting}>
              Save
            </Button>
          }
        >
          <PaymentMethodDetails />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
