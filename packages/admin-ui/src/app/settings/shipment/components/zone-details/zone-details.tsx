import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/components';

import { ZoneCountries } from './zone-countries-table/zone-countries';
import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails = () => {
  const { register, formState } = useFormContext<ZoneDetailsFormInput>();
  const { errors } = formState;

  return (
    <div className="flex flex-col gap-4">
      <FormInput label="Name" error={errors.name?.message} {...register('name')} />
      <ZoneCountries />
    </div>
  );
};
