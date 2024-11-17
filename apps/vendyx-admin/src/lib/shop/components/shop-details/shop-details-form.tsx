'use client';

import { SettingsPageLayout } from '@/lib/shared/components';
import { Form, FormInput } from '@/lib/shared/form';

import { useShopDetailsForm } from './use-shop-details-form';

export const ShopDetailsForm = () => {
  const form = useShopDetailsForm();

  return (
    <SettingsPageLayout title="Store details" subtitle="Update your store settings.">
      <Form {...form}>
        <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
          <FormInput control={form.control} label="Name" name="name" placeholder="Store name" />
        </form>
      </Form>
    </SettingsPageLayout>
  );
};
