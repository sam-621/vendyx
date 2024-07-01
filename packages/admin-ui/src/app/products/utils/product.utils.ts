import { type THashMap } from '@ebloc/common';

import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';

import { type ProductDetailsFormInput } from '../components/product-details/use-product-details-form';

/**
 * Validated if product details form is dirty
 */
export const isProductDetailsFormDirty = (
  product: CommonProductFragment,
  formInput: ProductDetailsFormInput
) => {
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
