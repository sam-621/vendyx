import { PaymentMethodService } from '@/api';
import { PaymentMethodsTable } from '@/components/payment';
import { SettingsPageLayout } from '@/components/shared';

export default async function PaymentMethodsPage() {
  const paymentMethods = await PaymentMethodService.getAll();

  return (
    <SettingsPageLayout title="Payments" subtitle="Manage your payment methods">
      <PaymentMethodsTable paymentMethods={paymentMethods} />
    </SettingsPageLayout>
  );
}
