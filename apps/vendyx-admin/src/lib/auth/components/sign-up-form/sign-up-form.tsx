'use client';

import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/lib/shared/components';
import { Form, FormInput } from '@/lib/shared/form';

import { useSignUpForm } from './use-sign-up-form';

export const SignUpForm = () => {
  const form = useSignUpForm();
  const { isLoading } = form;

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <FormInput
                control={form.control}
                name="email"
                placeholder="m@example.com"
                label="Email"
                type="email"
              />
              <FormInput
                control={form.control}
                name="password"
                placeholder="********"
                label="Password"
                type="password"
              />
              <Button isLoading={isLoading} type="submit" className="w-full">
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};
