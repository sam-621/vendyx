'use client';

import { CopyToClipboardButton, SettingsPageLayout } from '@/lib/shared/components';
import { Form, FormInput } from '@/lib/shared/form';

import { useShopDetailsForm } from './use-shop-details-form';

export const ShopDetailsForm = () => {
  const form = useShopDetailsForm();

  return (
    <SettingsPageLayout title="Store details" subtitle="Update your store settings.">
      <Form {...form}>
        <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
          <FormInput control={form.control} label="Name" name="name" placeholder="Store name" />
          <div className="flex items-center gap-2">
            <FormInput
              control={form.control}
              label="Shop Api key"
              name="shopApiKey"
              disabled
              isPassword
              description="This is your shop API key. It is used to authenticate your shop with the API."
              rightElement={<CopyToClipboardButton variant="outline" value="29164-124124-244" />}
            />
          </div>
        </form>
      </Form>
    </SettingsPageLayout>
  );
};
