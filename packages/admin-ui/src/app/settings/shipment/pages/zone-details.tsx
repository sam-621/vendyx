import { FormProvider } from 'react-hook-form';

import { SettingsPageLayout } from '@/lib/components';

import { useZoneDetailsForm } from '../components/zone-details/use-zone-details-form';

export const ZoneDetailsPage = () => {
  const form = useZoneDetailsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Create Zone"
          subtitle="Create zones to add rates for places you want to deliver."
          backUrl="/settings/shipment/zones"
        ></SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
