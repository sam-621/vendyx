import { type FieldValues, useForm as useRHForm, type UseFormProps } from 'react-hook-form';

export const useForm = <T extends FieldValues>(options: UseFormProps<T>) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isLoading }
  } = useRHForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    ...options
  });

  return {
    handleSubmit,
    register,
    errors,
    isSubmitting,
    isLoading,
    control
  };
};
