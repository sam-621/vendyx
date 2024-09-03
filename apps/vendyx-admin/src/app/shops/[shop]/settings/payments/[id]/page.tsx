import { notFound } from 'next/navigation';

import { PaymentMethodService } from '@/api';
import { PaymentMethodForm } from '@/components/payment';

export default async function PaymentDetailsPage({ params }: { params: { id: string } }) {
  const [integrations, method] = await Promise.all([
    PaymentMethodService.getAllIntegrations(),
    PaymentMethodService.getById(params.id)
  ]);

  if (!method) {
    return notFound();
  }

  return <PaymentMethodForm method={method} integrations={integrations} />;
}
