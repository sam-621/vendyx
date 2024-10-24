'use client';

import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api';
import { SettingsPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';
import { formatDate } from '@/lib/shared/utils';

import { useZoneDetailsForm } from './use-zone-details-form';
import { ZoneDetails } from './zone-details';
import { ZoneDetailsSubmitButton } from './zone-details-submit-button';

export const ZoneDetailsForm: FC<Props> = ({ zone }) => {
  const form = useZoneDetailsForm(zone);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          backUrl={`/settings/shipments`}
          title={zone ? zone.name : 'Create zone'}
          subtitle={
            zone
              ? `Created at ${formatDate(new Date(String(zone.createdAt)))}`
              : 'Create zones to add rates for places you want to deliver.'
          }
          actions={<ZoneDetailsSubmitButton zone={zone} isLoading={form.isLoading} />}
        >
          <ZoneDetails zone={zone} />
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  zone?: CommonZoneFragment;
};
