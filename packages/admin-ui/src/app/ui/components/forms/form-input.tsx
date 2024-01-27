import { Input, InputProps, Label } from '@vendyx/theme'
import { FC } from 'react'

// TODO: add a input css class
export const FormInput: FC<Props> = ({ label, placeholder, ...inputProps }) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label>{label}</Label>
      <Input placeholder={placeholder} {...inputProps} />
    </div>
  )
}

type Props = InputProps & {
  isTextarea?: false
  label: string
}
