import { useFormContext } from 'react-hook-form';

import { Label } from 'recharts';

import { Card, CardContent } from '@/shared/components/ui/card';
import { FormSwitch } from '@/shared/form/form-switch';

import { type CustomerDetailsFormInput } from '../customer-details/use-customer-details-form';

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
