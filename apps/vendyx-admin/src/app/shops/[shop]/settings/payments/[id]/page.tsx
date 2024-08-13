import { notFound } from 'next/navigation';

import { getPaymentIntegrations, getPaymentMethod, PaymentMethodForm } from '@/lib/payment-methods';

export default async function PaymentDetailsPage({ params }: { params: { id: string } }) {
  const [integrations, method] = await Promise.all([
    getPaymentIntegrations(),
    getPaymentMethod(params.id)
  ]);

  if (!method) {
    return notFound();
  }

  return <PaymentMethodForm method={method} integrations={integrations} />;
}
