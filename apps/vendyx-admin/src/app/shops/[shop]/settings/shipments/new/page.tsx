import { SettingsPageLayout } from '@/components/shared';
import { ZoneDetailsForm } from '@/components/shipment';

export default function NewZonePage() {
  return (
    <SettingsPageLayout
      title="Create zone"
      subtitle="Create zones to add rates for places you want to deliver."
    >
      <ZoneDetailsForm />
    </SettingsPageLayout>
  );
}
