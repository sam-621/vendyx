import { FormProvider } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { SettingsPageLayout } from '@/lib/components';

import { useZoneDetailsForm } from '../components/zone-details/use-zone-details-form';
import { ZoneDetails } from '../components/zone-details/zone-details';

export const CreateZonePage = () => {
  const form = useZoneDetailsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Create Zone"
          subtitle="Create zones to add rates for places you want to deliver."
          backUrl="/settings/shipments"
          actions={
            <Button type="submit" isLoading={form.formState.isSubmitting}>
              Save
            </Button>
          }
        >
          <ZoneDetails />
        </SettingsPageLayout>
      </form>
    </FormProvider>
  );
};
