import { type FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput, FormTextarea, SwitchContainer } from '@/lib/components/forms';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { ProductDetailsProvider } from '../../context/product-details-context';
import { AssetDetails } from './asset-details/asset-details';
import { VariantDetails } from './variant-details/variant-details';
import { ProductDetailsSlugInput } from './product-details-slug-input';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetails: FC<Props> = ({ product }) => {
  const { register, control, formState } = useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  return (
    <ProductDetailsProvider value={{ product }}>
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4 w-full">
            <FormInput
              {...register('name')}
              error={errors.name?.message}
              defaultValue={product?.name}
              label={t('product-details.general.input.name')}
              placeholder="Black T-shirt"
            />
            <ProductDetailsSlugInput product={product} />
          </div>
          <FormTextarea
            {...register('description')}
            defaultValue={product?.description ?? ''}
            label={t('product-details.general.input.description')}
          />
        </CardContent>
      </Card>

      <AssetDetails />

      <VariantDetails />

      <Card>
        <CardHeader>
          <CardTitle>{t('product-details.settings.title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Controller
            defaultValue={product?.published ?? false}
            control={control}
            name="published"
            render={({ field }) => (
              <SwitchContainer
                title={t('product-details.settings.display.title')}
                description={t('product-details.settings.display.description')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Controller
            defaultValue={product?.onlineOnly ?? false}
            control={control}
            name="onlineOnly"
            render={({ field }) => (
              <SwitchContainer
                title={t('product-details.settings.online.title')}
                description={t('product-details.settings.online.description')}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </CardContent>
      </Card>
    </ProductDetailsProvider>
  );
};

type Props = {
  product?: CommonProductFragment | null;
};
