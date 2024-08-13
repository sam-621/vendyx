import { getPaymentIntegrations, PaymentMethodForm } from '@/lib/payment-methods';

export default async function NewPaymentMethodPage() {
  const integrations = await getPaymentIntegrations();

  return <PaymentMethodForm integrations={integrations} />;
}
