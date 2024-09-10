import { CountryService } from '@/api';
import { EntityProvider } from '@/lib/shared/contexts';
import { ZoneDetailsForm } from '@/lib/shipment/components';

export default async function NewZonePage() {
  const countries = await CountryService.getAll();

  return (
    <EntityProvider entity={countries}>
      <ZoneDetailsForm />
    </EntityProvider>
  );
}
