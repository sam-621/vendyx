'use client';

import { Form } from '@/lib/form';

import { useZoneDetailsForm } from './use-zone-details-form';
import { ZoneDetails } from './zone-details';

export const ZoneDetailsForm = () => {
  const form = useZoneDetailsForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <ZoneDetails />
      </form>
    </Form>
  );
};
