import { Button } from '@vendyx/theme';

import { FormInput } from '@/components/forms';

import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const { onSubmit, isSubmitting, register, errors } = useLoginForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FormInput
        {...register('username')}
        label="Username"
        placeholder="admin"
        error={errors.username?.message}
      />
      <FormInput
        {...register('password')}
        label="Password"
        placeholder="******"
        error={errors.password?.message}
      />
      <Button isLoading={isSubmitting}>Login</Button>
    </form>
  );
};
