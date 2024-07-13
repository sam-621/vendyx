import { LogoLoader, SettingsPageLayout } from '@/lib/components';

import { ZonesTable } from '../components/zones-table/zones-table';
import { UseGetZones } from '../hooks';

export const ShipmentsPage = () => {
  const { zones, isLoading } = UseGetZones();

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <SettingsPageLayout title="Shipments" subtitle="Manage your rates depending on your zones">
      <ZonesTable zones={zones ?? []} />
    </SettingsPageLayout>
  );
};
