import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Card, CardContent, Label, Switch } from '@ebloc/theme';

import { type CustomerDetailsFormInput } from '../use-customer-details-form';

export const CustomerStatusSwitch: FC<Props> = ({ enabled }) => {
  const { control } = useFormContext<CustomerDetailsFormInput>();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Customer status</Label>
        <Controller
          defaultValue={enabled}
          control={control}
          name="enabled"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Switch id="customer-status" checked={field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="customer-status" className="cursor-pointer">
                Active
              </Label>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

type Props = {
  enabled: boolean;
};
