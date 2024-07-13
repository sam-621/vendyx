import { SettingsPageLayout } from '@/lib/components';

export const ZoneDetailsPage = () => {
  return (
    <SettingsPageLayout
      title="Create Zone"
      subtitle="Create zones to add rates for places you want to deliver."
      backUrl="/settings/shipment/zones"
    ></SettingsPageLayout>
  );
};
