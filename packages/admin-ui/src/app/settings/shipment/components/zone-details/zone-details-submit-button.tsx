import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetailsSubmitButton: FC<Props> = ({ zone }) => {
  const form = useFormContext<ZoneDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !isFormDirty(zone, values as ZoneDetailsFormInput);
  const isLoading = form.formState.isSubmitting;

  return (
    <Button disabled={isDisabled || isLoading} isLoading={isLoading} type="submit">
      Save
    </Button>
  );
};

const isFormDirty = (zone: CommonZoneFragment, formInput: ZoneDetailsFormInput) => {
  return Object.keys(formInput).some(key => {
    return ((zone as any)[key] ?? '') !== ((formInput as any)[key] ?? '');
  });
};

type Props = {
  zone: CommonZoneFragment;
};
