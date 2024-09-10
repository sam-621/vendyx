import { notFound } from 'next/navigation';

import { CountryService, type ID, ZoneService } from '@/api';
import { EntityProvider } from '@/lib/shared/contexts';
import { ZoneDetailsForm } from '@/lib/shipment/components';

export default async function ZoneDetailsPage({ params: { id } }: { params: { id: ID } }) {
  const [zone, countries] = await Promise.all([ZoneService.getById(id), CountryService.getAll()]);

  if (!zone) {
    notFound();
  }

  return (
    <EntityProvider entity={countries}>
      <ZoneDetailsForm zone={zone} />
    </EntityProvider>
  );
}
