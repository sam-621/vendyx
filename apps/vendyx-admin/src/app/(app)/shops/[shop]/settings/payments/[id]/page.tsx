import { notFound } from 'next/navigation';

import { PaymentMethodService } from '@/api/services';
import { PaymentMethodForm } from '@/lib/payment/components';

export default async function PaymentDetailsPage({ params }: { params: { id: string } }) {
  const [integrations, method] = await Promise.all([
    PaymentMethodService.getAllHandlers(),
    PaymentMethodService.getById(params.id)
  ]);

  if (!method) {
    return notFound();
  }

  return <PaymentMethodForm method={method} handlers={integrations} />;
}
