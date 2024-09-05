import { ZoneService } from '@/api';
import { SettingsPageLayout } from '@/components/shared';
import { ZonesTable } from '@/components/shipment';

export default async function ShipmentsPage() {
  const zones = await ZoneService.getAll();

  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable zones={zones} />
    </SettingsPageLayout>
  );
}
