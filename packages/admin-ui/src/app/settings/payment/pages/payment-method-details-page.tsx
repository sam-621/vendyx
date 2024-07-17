import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { LogoLoader, SettingsPageLayout } from '@/lib/components';
import { formatDate } from '@/lib/utils';

import { PaymentMethodDetails } from '../components/payment-method-details/payment-method-details';
import { usePaymentMethodDetailsForm } from '../components/payment-method-details/use-payment-method-details-form';
import { PaymentMethodDetailsSubmitButton } from '../components/payment-method-submit-button';
import { useGetPaymentMethod } from '../hooks';

export const PaymentMethodDetailsPage = () => {
  const { id } = useParams();
  const { paymentMethod, isLoading } = useGetPaymentMethod(id ?? '');
  const form = usePaymentMethodDetailsForm(id);

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!paymentMethod) {
    return <Navigate to="/settings/payments" />;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title={paymentMethod.name}
          subtitle={formatDate(new Date(paymentMethod.createdAt as string))}
          backUrl="/settings/payments"
          actions={<PaymentMethodDetailsSubmitButton paymentMethod={paymentMethod} />}
        >
          <PaymentMethodDetails paymentMethod={paymentMethod} />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
