import { PaymentMethodService } from '@/api/services';
import { PaymentMethodForm } from '@/lib/payment/components';

export default async function NewPaymentMethodPage() {
  const integrations = await PaymentMethodService.getAllHandlers();

  return <PaymentMethodForm handlers={integrations} />;
}
