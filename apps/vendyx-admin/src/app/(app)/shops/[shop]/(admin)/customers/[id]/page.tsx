import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { CustomerService } from '@/api/services';
import { CustomerDetailsForm } from '@/lib/customer/components';
import { EntityProvider } from '@/lib/shared/contexts';

export default async function CustomerDetailsPage({ params }: { params: { id: ID } }) {
  const customer = await CustomerService.getById(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <EntityProvider entity={customer}>
      <CustomerDetailsForm customer={customer} />
    </EntityProvider>
  );
}
