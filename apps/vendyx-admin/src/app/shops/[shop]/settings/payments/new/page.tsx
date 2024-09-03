import { PaymentMethodService } from '@/api';
import { PaymentMethodForm } from '@/components/payment';

export default async function NewPaymentMethodPage() {
  const integrations = await PaymentMethodService.getAllIntegrations();

  return <PaymentMethodForm integrations={integrations} />;
}
