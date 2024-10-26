import { useFormContext } from 'react-hook-form';

import { Card, CardContent, Label } from '@/lib/shared/components';
import { FormSwitch } from '@/lib/shared/form';

import { type CustomerDetailsFormInput } from '../customer-details';

export const CustomerStatusSwitchCard = () => {
  const { control } = useFormContext<CustomerDetailsFormInput>();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Customer status</Label>
        <FormSwitch control={control} name="enabled" label="Enabled" />
      </CardContent>
    </Card>
  );
};
