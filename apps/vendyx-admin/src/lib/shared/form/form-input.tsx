import { type ComponentProps, type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';

import { Input } from '../components';
import { cn } from '../utils';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';

export const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  placeholder,
  type,
  isPrice,
  isPassword,
  rightElement: RightElement,
  className,
  ...rest
}: Props<TFieldValues, TName>) => {
  return (
    <FormField
      {...rest}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <div className="flex items-center gap-2 w-full">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                isPrice={isPrice}
                isPassword={isPassword}
                {...field}
              />
            </FormControl>
            {RightElement && RightElement}
          </div>
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
> = Pick<
  ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'defaultValue' | 'disabled' | 'name'
> & {
  label?: string;
  description?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  isPrice?: boolean;
  isPassword?: boolean;
  rightElement?: ReactNode;
  className?: string;
};
