'use client';

import { type FC } from 'react';

import { type CommonShopFragment } from '@/api/types';
import { CopyToClipboardButton } from '@/shared/components/copy-to-clipboard/copy-to-clipboard-button';
import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout/settings-page-layout';
import { Separator } from '@/shared/components/ui/separator';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';
import { FormPhoneInput } from '@/shared/form/form-phone-input';

import { GenerateShopApiKeyButton } from '../generate-shop-api-key/generate-shop-api-key-button';
import { ShopDetailsSubmitButton } from './shop-details-submit-button';
import { useShopDetailsForm } from './use-shop-details-form';

export const ShopDetailsForm: FC<Props> = ({ shop }) => {
  const form = useShopDetailsForm(shop);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <SettingsPageLayout
          title="Store details"
          subtitle="Update your store settings."
          actions={<ShopDetailsSubmitButton shop={shop} />}
        >
          <div className="flex flex-col gap-4">
            <FormInput control={form.control} label="Name" name="name" placeholder="Store name" />
            <FormInput
              control={form.control}
              label="Email"
              name="email"
              placeholder="m@example.com"
            />
            <FormPhoneInput label="Phone number" control={form.control} name="phoneNumber" />
            <Separator />
            <div className="flex items-center gap-2">
              <FormInput
                control={form.control}
                label="Shop Api key"
                name="shopApiKey"
                disabled
                isPassword
                description="Use this key to access to the Shop API from your storefront."
                rightElement={
                  <div className="flex items-center gap-2">
                    <CopyToClipboardButton variant="outline" value={shop.shopApiKey} />
                    <GenerateShopApiKeyButton />
                  </div>
                }
              />
            </div>
          </div>
        </SettingsPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  shop: CommonShopFragment;
};
