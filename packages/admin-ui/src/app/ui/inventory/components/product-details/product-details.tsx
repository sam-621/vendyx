import { Controller, useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';

import { FormInput, FormTextarea, SwitchContainer } from '@/components/forms';

import { AssetDetails } from './forms/asset-details';
import { VariantDetails } from './forms/variant-details';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetails = () => {
  const { register, control } = useFormContext<ProductDetailsFormInput>();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <FormInput {...register('name')} label="Name" placeholder="Black T-shirt" />
            <FormInput {...register('slug')} label="Slug" placeholder="black-t-shirt" />
          </div>
          <FormTextarea {...register('description')} label="Description" />
        </CardContent>
      </Card>

      <AssetDetails />

      <VariantDetails />

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Controller
            defaultValue={false}
            control={control}
            name="published"
            render={({ field }) => (
              <SwitchContainer
                title="Display on storefront"
                description="Decide if the product shows in your storefront or not"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Controller
            defaultValue={false}
            control={control}
            name="onlineOnly"
            render={({ field }) => (
              <SwitchContainer
                title="Online product"
                description="Check if this is a online product and does not need to be shipped"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};
