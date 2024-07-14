import { FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { LogoLoader, SettingsPageLayout } from '@/lib/components';
import { formatDate } from '@/lib/utils';

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
          title={zone.name}
          subtitle={formatDate(new Date(zone.createdAt as string))}
          backUrl="/settings/shipments"
          actions={<ZoneDetailsSubmitButton zone={zone} />}
        >
          <ZoneDetails zone={zone} />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
