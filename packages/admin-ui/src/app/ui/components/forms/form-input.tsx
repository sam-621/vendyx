import { Input, Label } from '@vendyx/theme'
import { FC } from 'react'

export const FormInput: FC<Props> = ({ label, placeholder }) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <Input placeholder={placeholder} />
    </div>
  )
}

type Props = {
  label: string
  placeholder?: string
}
