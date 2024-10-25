import { ZoneService } from '@/api/services';
import { SettingsPageLayout } from '@/lib/shared/components';
import { ZonesTable } from '@/lib/shipment/components';

export default async function ShipmentsPage() {
  const zones = await ZoneService.getAll();

  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable zones={zones} />
    </SettingsPageLayout>
  );
}
