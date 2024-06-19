import { type FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { getParsedSlug } from '@ebloc/common';
import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput, FormTextarea, SwitchContainer } from '@/lib/components/forms';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { ProductDetailsProvider } from '../../context/product-details-context';
import { AssetDetails } from './asset-details/asset-details';
import { VariantDetails } from './variant-details/variant-details';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetails: FC<Props> = ({ product }) => {
  const { register, control, formState, watch, setValue } =
    useFormContext<ProductDetailsFormInput>();
  const { errors } = formState;

  const parsedSlug = getParsedSlug(watch('name') ?? product?.name ?? '');

  useEffect(() => {
    setValue('slug', parsedSlug);
  }, [parsedSlug]);

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
            <FormInput
              {...register('slug')}
              value={parsedSlug}
              defaultValue={product?.slug}
              label={t('product-details.general.input.slug')}
              placeholder="black-t-shirt"
              disabled
            />
          </div>
          <FormTextarea
            {...register('description')}
            defaultValue={product?.description ?? ''}
            label={t('product-details.general.input.description')}
          />
        </CardContent>
      </Card>

      <AssetDetails assets={product?.assets} />

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
