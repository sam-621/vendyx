import { getPaymentMethods, PaymentMethodsTable } from '@/lib/payment-methods';
import { SettingsPageLayout } from '@/lib/shared/components';

export default async function PaymentMethodsPage() {
  const paymentMethods = await getPaymentMethods();

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods} />
    </SettingsPageLayout>
  );
}
