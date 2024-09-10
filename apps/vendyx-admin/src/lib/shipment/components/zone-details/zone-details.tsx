'use client';

import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/shared/form';

import { ZoneCountries } from '../zone-countries';
import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails = () => {
  const { control } = useFormContext<ZoneDetailsFormInput>();
  return (
    <div className="flex flex-col gap-4">
      <FormInput control={control} name="name" label="Name" placeholder="International" />
      <ZoneCountries />
    </div>
  );
};
