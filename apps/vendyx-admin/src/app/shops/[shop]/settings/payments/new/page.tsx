import { PaymentMethodService } from '@/api';
import { PaymentMethodForm } from '@/lib/payment/components';

export default async function NewPaymentMethodPage() {
  const integrations = await PaymentMethodService.getAllIntegrations();

  return <PaymentMethodForm integrations={integrations} />;
}
