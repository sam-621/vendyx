import { type FC } from 'react';

import { Input, type InputProps, Label } from '@vendyx/theme';

// TODO: add a input css class
export const FormInput: FC<Props> = ({ label, placeholder, ...inputProps }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <Input placeholder={placeholder} {...inputProps} />
    </div>
  );
};

type Props = InputProps & {
  isTextarea?: false;
  label: string;
};
