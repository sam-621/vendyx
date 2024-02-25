import { type FieldValues, useForm as useRHForm, type UseFormProps } from 'react-hook-form';

export const useForm = <T extends FieldValues>(options: UseFormProps<T>) => {
  return useRHForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    ...options
  });
};
