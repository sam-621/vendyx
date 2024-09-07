'use client';

import { SettingsPageLayout } from '@/components/shared';
import { Form } from '@/lib/form';

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
          actions={<ZoneDetailsSubmitButton />}
        >
          <ZoneDetails />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};
