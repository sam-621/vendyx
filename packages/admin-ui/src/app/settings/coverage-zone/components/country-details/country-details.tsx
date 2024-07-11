import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Label, Switch } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { CountryDetailsProvider } from '../../context';
import { StatesDetails } from './states-details/state-details';
import { type CountryDetailsFormInput } from './use-country-details-form';

export const CountryDetails: FC<Props> = ({ country }) => {
  const { register, control } = useFormContext<CountryDetailsFormInput>();

  return (
    <CountryDetailsProvider value={{ country }}>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 items-end">
          <FormInput {...register('name')} label="Name" placeholder="Mexico" />
          <Controller
            control={control}
            name="enabled"
            render={({ field }) => (
              <div className="flex items-center space-x-2 pb-[6px]">
                <Switch
                  id="country-status"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="country-status" className="cursor-pointer text-base">
                  Active
                </Label>
              </div>
            )}
          />
        </div>

        {country && <StatesDetails states={country?.states.items ?? []} />}
      </div>
    </CountryDetailsProvider>
  );
};

type Props = {
  country?: CommonCountryFragment;
};
