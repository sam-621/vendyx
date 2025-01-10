'use client';

import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonZoneFragment } from '@/api/types';
import { FormInput } from '@/shared/form/form-input';

import { RemoveZoneButton } from '../remove-zone/remove-zone-button';
import { ShippingMethodsTable } from '../shipping-methods-table/shipping-methods-table';
import { ZoneCountries } from '../zone-countries/zone-countries';
import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetails: FC<Props> = ({ zone }) => {
  const { control } = useFormContext<ZoneDetailsFormInput>();

  return (
    <div className="flex flex-col gap-4">
      <FormInput control={control} name="name" label="Name" placeholder="International" />
      <ZoneCountries />
      {zone && <ShippingMethodsTable shippingMethods={zone?.shippingMethods ?? []} />}
      {zone && <RemoveZoneButton zone={zone} />}
    </div>
  );
};

type Props = {
  zone?: CommonZoneFragment;
};
