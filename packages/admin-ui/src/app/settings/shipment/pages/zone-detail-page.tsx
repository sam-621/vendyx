import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { LogoLoader, SettingsPageLayout } from '@/lib/components';

import { useZoneDetailsForm } from '../components/zone-details/use-zone-details-form';
import { ZoneDetails } from '../components/zone-details/zone-details';
import { ZoneDetailsSubmitButton } from '../components/zone-details/zone-details-submit-button';
import { useGetZone } from '../hooks';

export const ZoneDetailsPage = () => {
  const { id } = useParams();
  const { zone, isLoading } = useGetZone(id ?? '');

  const form = useZoneDetailsForm(zone);

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!zone) {
    return <Navigate to="/settings/shipments" />;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Create Zone"
          subtitle="Create zones to add rates for places you want to deliver."
          backUrl="/settings/shipments"
          actions={<ZoneDetailsSubmitButton zone={zone} />}
        >
          <ZoneDetails />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
