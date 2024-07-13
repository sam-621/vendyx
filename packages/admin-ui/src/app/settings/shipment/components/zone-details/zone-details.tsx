import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/components';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails = () => {
  const { register, formState } = useFormContext<ZoneDetailsFormInput>();
  const { errors } = formState;

  return <FormInput label="Name" error={errors.name?.message} {...register('name')} />;
};
