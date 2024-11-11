import { useFormContext } from 'react-hook-form';

import { Card, CardContent, Label } from '@/lib/shared/components';
import { FormSwitch } from '@/lib/shared/form';

import { type CollectionDetailsFormInput } from '../collection-details';

export const CollectionStatusSwitchCard = () => {
  const { control } = useFormContext<CollectionDetailsFormInput>();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Collection status</Label>
        <FormSwitch control={control} name="enabled" label="Published" />
      </CardContent>
    </Card>
  );
};
