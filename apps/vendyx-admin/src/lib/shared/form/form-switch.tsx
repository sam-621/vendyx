import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Switch } from '../components/ui';
import { FormControl, FormField, type FormFieldProps, FormItem, FormLabel } from './form';

export const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      {...rest}
      render={({ field }) => (
        <FormItem className="flex items-center gap-2 space-y-0">
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          {label && <FormLabel className="m-0">Active</FormLabel>}
        </FormItem>
      )}
    />
  );
};

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = FormFieldProps<TFieldValues, TName> & {
  label?: string;
};
