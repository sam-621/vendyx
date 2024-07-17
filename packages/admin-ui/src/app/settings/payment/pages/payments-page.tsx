import { LogoLoader, SettingsPageLayout } from '@/lib/components';

import { PaymentMethodsTable } from '../components/payment-methods-table/payment-methods-table';
import { useGetPaymentMethods } from '../hooks';

export const PaymentsPage = () => {
  const { paymentMethods, isLoading } = useGetPaymentMethods();

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <SettingsPageLayout>
      <PaymentMethodsTable paymentMethods={paymentMethods ?? []} />
    </SettingsPageLayout>
  );
};
