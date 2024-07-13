import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/components';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails = () => {
  const { register } = useFormContext<ZoneDetailsFormInput>();
  return <FormInput label="Name" {...register('name')} />;
};
