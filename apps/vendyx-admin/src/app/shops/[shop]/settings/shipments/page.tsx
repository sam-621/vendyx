import { SettingsPageLayout } from '@/lib/shared/components';
import { getZones } from '@/lib/shipments';
import { ZonesTable } from '@/lib/shipments/components/zones-table/zones-table';

export default async function ShipmentsPage() {
  const zones = await getZones();

  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable zones={zones} />
    </SettingsPageLayout>
  );
}
