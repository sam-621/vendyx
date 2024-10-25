import { CountryService, ShippingMethodService } from '@/api/services';
import { EntityProvider } from '@/lib/shared/contexts';
import { ZoneDetailsForm } from '@/lib/shipment/components';

export default async function NewZonePage() {
  const [countries, shippingHandlers] = await Promise.all([
    CountryService.getAll(),
    ShippingMethodService.getHandlers()
  ]);

  return (
    <EntityProvider entity={{ countries, shippingHandlers }}>
      <ZoneDetailsForm />
    </EntityProvider>
  );
}
