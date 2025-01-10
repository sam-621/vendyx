import { useFormContext } from 'react-hook-form';

import { Card, CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { FormSwitch } from '@/shared/form/form-switch';

import { type CollectionDetailsFormInput } from '../collection-details/use-collection-details-form';

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
