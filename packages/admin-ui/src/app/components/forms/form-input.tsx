import { forwardRef } from 'react';

import { Input, type InputProps, Label } from '@vendyx/theme';

// TODO: add a input css class
export const FormInput = forwardRef<HTMLInputElement, Props>(function FormInput(
  { label, placeholder, error, ...inputProps },
  ref
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <Input ref={ref} placeholder={placeholder} {...inputProps} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
});

type Props = InputProps & {
  label: string;
  error?: string;
};
