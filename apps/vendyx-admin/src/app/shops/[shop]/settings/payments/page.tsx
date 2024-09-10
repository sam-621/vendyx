import { PaymentMethodService } from '@/api';
import { PaymentMethodsTable } from '@/lib/payment/components';
import { SettingsPageLayout } from '@/lib/shared/components';

export default async function PaymentMethodsPage() {
  const paymentMethods = await PaymentMethodService.getAll();

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods} />
    </SettingsPageLayout>
  );
}
