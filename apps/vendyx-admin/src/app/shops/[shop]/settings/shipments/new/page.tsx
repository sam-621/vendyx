import { CountryService } from '@/api';
import { ZoneDetailsForm } from '@/components/shipment';
import { EntityProvider } from '@/lib/contexts';

export default async function NewZonePage() {
  const countries = await CountryService.getAll();

  return (
    <EntityProvider entity={countries}>
      <ZoneDetailsForm />
    </EntityProvider>
  );
}
