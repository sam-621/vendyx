'use client';

import { type FC } from 'react';

import { type CommonShopFragment } from '@/api/types';
import { CopyToClipboardButton, SettingsPageLayout } from '@/lib/shared/components';
import { Form, FormInput } from '@/lib/shared/form';

import { useShopDetailsForm } from './use-shop-details-form';

export const ShopDetailsForm: FC<Props> = ({ shop }) => {
  const form = useShopDetailsForm(shop);

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
              description="Use this key to access to the Shop API from your storefront."
              rightElement={<CopyToClipboardButton variant="outline" value={shop.shopApiKey} />}
            />
          </div>
        </form>
      </Form>
    </SettingsPageLayout>
  );
};

type Props = {
  shop: CommonShopFragment;
};
