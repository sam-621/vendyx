import { forwardRef } from 'react';

import { cn, Input, type InputProps, Label } from '@ebloc/theme';

// TODO: add a input css class
export const FormInput = forwardRef<HTMLInputElement, Props>(function FormInput(
  { label, placeholder, error, containerClassName, className, ...inputProps },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-2 w-full', containerClassName)}>
      <Label>{label}</Label>
      <Input
        ref={ref}
        placeholder={placeholder}
        className={cn(
          'bg-background',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...inputProps}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

type Props = InputProps & {
  label?: string;
  containerClassName?: string;
  error?: string;
};
