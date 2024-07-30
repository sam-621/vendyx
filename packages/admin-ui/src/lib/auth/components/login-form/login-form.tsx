import { Button } from '@ebloc/theme';

import { Form, FormInput } from '@/lib/shared';

import { useLoginForm } from './use-login-form';

export const LoginForm = () => {
  const form = useLoginForm();
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-6">
        <FormInput control={form.control} name="username" label="Username" placeholder="Admin" />
        <FormInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="******"
          type="password"
        />
        <Button disabled={isSubmitting} isLoading={isSubmitting} className="w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};
