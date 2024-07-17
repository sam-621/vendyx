import { LogoLoader, SettingsPageLayout } from '@/lib/components';

import { PaymentMethodsTable } from '../components/payment-methods-table/payment-methods-table';
import { useGetPaymentMethods } from '../hooks';

export const PaymentsPage = () => {
  const { paymentMethods, isLoading } = useGetPaymentMethods();

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods ?? []} />
    </SettingsPageLayout>
  );
};
