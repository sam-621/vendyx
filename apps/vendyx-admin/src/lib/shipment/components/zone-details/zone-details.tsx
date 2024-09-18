'use client';

import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonZoneFragment } from '@/api';
import { FormInput } from '@/lib/shared/form';

import { RemoveZoneButton } from '../remove-zone';
import { ShippingMethodsTable } from '../shipping-methods-table';
import { ZoneCountries } from '../zone-countries';
import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails: FC<Props> = ({ zone }) => {
  const { control } = useFormContext<ZoneDetailsFormInput>();

  return (
    <div className="flex flex-col gap-4">
      <FormInput control={control} name="name" label="Name" placeholder="International" />
      <ZoneCountries />
      <ShippingMethodsTable shippingMethods={zone?.shippingMethods ?? []} />
      {zone && <RemoveZoneButton zone={zone} />}
    </div>
  );
};

type Props = {
  zone?: CommonZoneFragment;
};
