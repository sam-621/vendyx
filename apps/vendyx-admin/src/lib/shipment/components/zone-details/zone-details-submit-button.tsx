import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/lib/shared/components';

import { type ZoneDetailsFormInput } from './use-zone-details-form';

export const ZoneDetailsSubmitButton: FC<Props> = ({ isLoading }) => {
  const form = useFormContext<ZoneDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const withRequiredValues = Boolean(values.name?.length);

  return (
    <Button type="submit" disabled={!withRequiredValues || isLoading} isLoading={isLoading}>
      Save
    </Button>
  );
};

type Props = {
  isLoading: boolean;
};
