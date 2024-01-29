import { type FC } from 'react';

import { Label, Textarea, type TextareaProps } from '@vendyx/theme';

export const FormTextarea: FC<Props> = ({ label, placeholder, ...textareaProps }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <Textarea placeholder={placeholder} {...textareaProps} />
    </div>
  );
};

type Props = TextareaProps & {
  isTextarea?: false;
  label: string;
};
