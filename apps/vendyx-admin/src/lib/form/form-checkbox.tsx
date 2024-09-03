import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Checkbox } from '../../components/shared';
import { FormControl, FormField, type FormFieldProps, FormItem, FormLabel } from './form';

export const FormCheckbox = <
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
            <Checkbox onCheckedChange={field.onChange} checked={field.value} />
          </FormControl>
          {label && (
            <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </FormLabel>
          )}
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
