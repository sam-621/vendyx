'use client';

import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/form';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails = () => {
  const { control } = useFormContext<ZoneDetailsFormInput>();
  return (
    <div>
      <FormInput control={control} name="name" label="Name" placeholder="International" />
    </div>
  );
};
