import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '@/lib/components';
import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { ShippingMethodsTable } from './shipping-methods/shipping-methods-table';
import { ZoneCountries } from './zone-countries/zone-countries';
import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails: FC<Props> = ({ zone }) => {
  const { register, formState } = useFormContext<ZoneDetailsFormInput>();
  const { errors } = formState;

  return (
    <div className="flex flex-col gap-4">
      <FormInput label="Name" error={errors.name?.message} {...register('name')} />
      {zone && <ZoneCountries zone={zone} />}
      {zone && zone.countries.items.length > 0 && <ShippingMethodsTable zone={zone} />}
    </div>
  );
};

type Props = {
  zone?: CommonZoneFragment;
};
