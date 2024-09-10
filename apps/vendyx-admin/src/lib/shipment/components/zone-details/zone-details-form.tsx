'use client';

import { SettingsPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { useZoneDetailsForm } from './use-zone-details-form';
import { ZoneDetails } from './zone-details';
import { ZoneDetailsSubmitButton } from './zone-details-submit-button';

export const ZoneDetailsForm = () => {
  const form = useZoneDetailsForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Create zone"
          subtitle="Create zones to add rates for places you want to deliver."
          actions={<ZoneDetailsSubmitButton isLoading={form.isLoading} />}
        >
          <ZoneDetails />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};
