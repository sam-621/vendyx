'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/lib/shared/components';
import { Form, FormInput } from '@/lib/shared/form';

import { useCreateShopForm } from './use-create-shop-form';

export const CreateShopForm = () => {
  const form = useCreateShopForm();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create shop</CardTitle>
        <CardDescription>Enter your shop name to start selling</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
            <FormInput control={form.control} name="name" label="Name" placeholder="E-Store" />
            <div className="text-right">
              <Button isLoading={form.isLoading}>Create shop</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
