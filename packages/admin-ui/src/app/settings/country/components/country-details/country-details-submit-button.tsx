import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonCountryFragment } from '@/lib/ebloc/codegen/graphql';

import { type CountryDetailsFormInput } from './use-country-details-form';

export const CountryDetailsSubmitButton: FC<Props> = ({ country }) => {
  const form = useFormContext<CountryDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !isFormDirty(country, values as CountryDetailsFormInput);
  const isLoading = form.formState.isSubmitting;

  return (
    <Button disabled={isDisabled || isLoading} isLoading={isLoading} type="submit">
      Save
    </Button>
  );
};

export const isFormDirty = (country: CommonCountryFragment, formInput: CountryDetailsFormInput) => {
  return Object.keys(formInput).some(key => {
    return ((country as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  country: CommonCountryFragment;
};
