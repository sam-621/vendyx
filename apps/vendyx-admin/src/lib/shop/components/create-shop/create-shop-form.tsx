'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/lib/shared/components';
import { Form, FormInput, FormPhoneInput } from '@/lib/shared/form';

import { useCreateShopForm } from './use-create-shop-form';

export const CreateShopForm = () => {
  const form = useCreateShopForm();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Create shop</CardTitle>
        <CardDescription>Enter your shop details to start selling</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
            <FormInput control={form.control} name="name" label="Name" placeholder="E-Store" />
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="m@example.com"
              description="Email used for customers to contact you"
            />
            {/* <FormInput
              control={form.control}
              name="phoneNumber"
              label="Phone number"
              placeholder="+1 234 567 8901"
              description="Phone number used for customers to contact you"
            /> */}
            <FormPhoneInput control={form.control} name="phoneNumber" />
            <div className="text-right">
              <Button isLoading={form.isLoading}>Create shop</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
