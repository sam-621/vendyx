import { Controller, useFormContext } from 'react-hook-form';

import { Card, CardContent, Label, Switch } from '@ebloc/theme';

import { type CollectionDetailsFormInput } from '../use-collection-details-form';

export const CollectionVisibility = () => {
  const { control } = useFormContext<CollectionDetailsFormInput>();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 mt-6">
        <Label className="text-base">Visibility</Label>
        <Controller
          control={control}
          name="published"
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Switch
                id="collection-status"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="collection-status" className="cursor-pointer">
                Online store
              </Label>
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};
