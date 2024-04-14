import { Button } from '@vendyx/theme';

import { FormInput } from '@/components/forms';
import { t } from '@/lib/locales';

import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const { onSubmit, isSubmitting, register, errors } = useLoginForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FormInput
        {...register('username')}
        label={t('login.form.input.username')}
        placeholder="admin"
        error={errors.username?.message}
      />
      <FormInput
        {...register('password')}
        label={t('login.form.input.username')}
        placeholder="******"
        error={errors.password?.message}
      />
      <Button isLoading={isSubmitting}>{t('login.form.button.login')}</Button>
    </form>
  );
};
