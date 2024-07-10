import { type FC } from 'react';

import { Label, Switch } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { StatesDetails } from './states-details/state-details';

export const CountryDetails: FC<Props> = ({ country }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 items-end">
        <FormInput label="Name" value={country?.name} />
        <div className="flex items-center space-x-2 pb-[6px]">
          <Switch id="customer-status" />
          <Label htmlFor="customer-status" className="cursor-pointer text-base">
            Active
          </Label>
        </div>
      </div>

      <StatesDetails states={country?.states.items ?? []} />
    </div>
  );
};

type Props = {
  country?: CommonCountryFragment;
};
