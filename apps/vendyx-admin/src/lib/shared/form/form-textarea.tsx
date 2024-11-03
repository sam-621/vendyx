import { type ReactNode } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Textarea } from '../components';
import {
  FormControl,
  FormDescription,
  FormField,
  type FormFieldProps,
  FormItem,
  FormLabel,
  FormMessage
} from './form';

export const FormTextarea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      name={name}
      {...rest}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea placeholder={placeholder} className="resize-none" rows={5} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
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
  description?: ReactNode;
  placeholder?: string;
};
