import { forwardRef } from 'react';

import { Label, Textarea, type TextareaProps } from '@ebloc/theme';

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(function FormTextarea(
  { label, placeholder, ...textareaProps },
  ref
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>{label}</Label>
      <Textarea rows={6} ref={ref} placeholder={placeholder} {...textareaProps} />
    </div>
  );
});

type Props = TextareaProps & {
  isTextarea?: false;
  label: string;
};
