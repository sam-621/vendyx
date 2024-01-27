import { Label, Textarea, TextareaProps } from '@vendyx/theme'
import { FC } from 'react'

export const FormTextarea: FC<Props> = ({ label, placeholder, ...textareaProps }) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>{label}</Label>
      <Textarea placeholder={placeholder} {...textareaProps} />
    </div>
  )
}

type Props = TextareaProps & {
  isTextarea?: false
  label: string
}
