import { type FC } from 'react';
import { type DeepPartial, useFormContext, useWatch } from 'react-hook-form';

import { type CommonZoneFragment } from '@/api';
import { Button } from '@/lib/shared/components';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetailsSubmitButton: FC<Props> = ({ isLoading, zone }) => {
  const form = useFormContext<ZoneDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredValues = Boolean(values.name?.length);
  const formHasChanged = zone ? valuesHasChanged(values, zone) : true; // is creating a new zone

  return (
    <Button
      type="submit"
      disabled={!withRequiredValues || isLoading || !formHasChanged}
      isLoading={isLoading}
    >
      Save
    </Button>
  );
};

const valuesHasChanged = (
  values: DeepPartial<ZoneDetailsFormInput>,
  defaultValues: CommonZoneFragment
) => {
  const isNameChanged = values.name !== defaultValues.name;

  const isStatesChanged =
    values?.states?.length !== defaultValues.states.length ||
    values?.states.some((state, index) => state?.id !== defaultValues.states[index].id);

  return isNameChanged || isStatesChanged;
};

type Props = {
  isLoading: boolean;
  zone?: CommonZoneFragment;
};
