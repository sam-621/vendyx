import { notFound } from 'next/navigation';

import { CountryService, type ID, ShippingMethodService, ZoneService } from '@/api';
import { EntityProvider } from '@/lib/shared/contexts';
import { ZoneDetailsForm } from '@/lib/shipment/components';

export default async function ZoneDetailsPage({ params: { id } }: { params: { id: ID } }) {
  const [zone, countries, shippingHandlers] = await Promise.all([
    ZoneService.getById(id),
    CountryService.getAll(),
    ShippingMethodService.getHandlers()
  ]);

  if (!zone) {
    notFound();
  }

  return (
    <EntityProvider entity={{ countries, shippingHandlers, zone }}>
      <ZoneDetailsForm zone={zone} />
    </EntityProvider>
  );
}
