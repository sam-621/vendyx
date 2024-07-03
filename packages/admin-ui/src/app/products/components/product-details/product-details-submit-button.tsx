import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { type THashMap } from '@ebloc/common';
import { Button } from '@ebloc/theme';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';

import { useVariantsContext } from '../../context';
import { type ProductDetailsFormInput } from './use-product-details-form';

export const ProductDetailsSubmitButton: FC<Props> = ({ product }) => {
  const { variantsWithChanges } = useVariantsContext();
  const form = useFormContext<ProductDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled =
    !isProductDetailsFormDirty(product, values as ProductDetailsFormInput) &&
    !variantsWithChanges.length;
  const isLoading = form.formState.isSubmitting;

  return (
    <Button disabled={isDisabled || isLoading} isLoading={isLoading} type="submit">
      {t('product-details.action.save')}
    </Button>
  );
};

type Props = {
  product: CommonProductFragment | null | undefined;
};

export const isProductDetailsFormDirty = (
  product: CommonProductFragment | null | undefined,
  formInput: ProductDetailsFormInput
) => {
  // this means is a new product
  if (!product) return true;

  if (formInput.assets?.length) return true;

  const persisted: Omit<ProductDetailsFormInput, 'assets'> & THashMap<string | number | boolean> = {
    name: product.name,
    slug: product.slug,
    description: product.description ?? '',
    onlineOnly: product.onlineOnly,
    published: product.published,
    price: product.variants.items[0].price,
    sku: product.variants.items[0].sku,
    quantity: product.variants.items[0].stock
  };

  const formattedInput: Omit<ProductDetailsFormInput, 'assets'> &
    THashMap<string | number | boolean> = {
    name: formInput.name,
    slug: formInput.slug,
    description: formInput.description,
    onlineOnly: formInput.onlineOnly,
    published: formInput.published,
    price: formInput.price * 100,
    sku: formInput.sku,
    quantity: Number(formInput.quantity)
  };

  const result = Object.keys(persisted).some(key => {
    if (['price', 'sku', 'quantity'].includes(key) && product.variants.items.length > 1) {
      return false;
    }

    return (formattedInput as any)[key] !== persisted[key];
  });

  return result;
};
