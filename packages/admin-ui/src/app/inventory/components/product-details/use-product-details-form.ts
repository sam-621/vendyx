import { useNavigate } from 'react-router-dom';

import { getFormattedPrice, type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useCreateAsset } from '@/app/assets';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { parseFormattedPrice } from '@/lib/utils';

import { useProductDetailsContext } from '../../context';
import {
  InventoryKeys,
  useCreateProduct,
  useCreateVariant,
  useUpdateProduct,
  useUpdateVariant
} from '../../hooks';

/**
 * Hook to handle the product details form
 * @param update If provided, the form will update the product with the given id
 * @returns Form methods and state
 */
export const useProductDetailsForm = (update?: { productId: string; variantId: string }) => {
  const { product } = useProductDetailsContext();
  const navigate = useNavigate();
  const { createAsset } = useCreateAsset();
  const { createProduct } = useCreateProduct();
  const { createVariant } = useCreateVariant();
  const { updateProduct } = useUpdateProduct();
  const { updateVariant } = useUpdateVariant();

  const form = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: ProductDetailsFormInput) => {
    if (!form.formState.isDirty) return;

    const isUpdating = update?.productId;
    const assets = input.assets ? await createAsset(input.assets) : undefined;

    const productInput = {
      name: input.name,
      slug: input.slug,
      description: input.description,
      onlineOnly: input.onlineOnly,
      published: input.published,
      assetsIds: [...input.prevAssets, ...(assets?.map(asset => asset.id) ?? [])]
    };

    const variantInput = {
      price: input.price,
      sku: input.sku,
      stock: input.quantity,
      published: input.published
    };

    if (isUpdating) {
      const { productId, variantId } = update;

      await updateProduct(productId, productInput);
      variantId && (await updateVariant(variantId, variantInput));
      await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

      notification.success('Product updated');
    } else {
      const createdProductId = await createProduct(productInput);

      // If not product id is present, it means that an error occurred
      // The error is already handled by the useCreateProduct hook so we only stop the execution here
      if (!createdProductId) return;

      await createVariant(createdProductId, variantInput);
      await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

      notification.success(`Product ${input.name} created`);
      navigate(`/inventory/${input.slug}`);
    }

    const productHasOptions = Boolean(product?.options.length);
    if (productHasOptions) return;

    // set formatted price to price input
    // We do not do it when product has option because this code expects that the default variant form is rendered
    // And when the product has options, the default variant form is not rendered
    form.setValue(
      'price',
      getFormattedPrice(input.price * 100).replace('$', '') as unknown as number
    );
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.maxChars(3)),
  slug: z.string().min(3, FormMessages.maxChars(3)),
  description: z.string().optional(),
  assets: z.any(),
  prevAssets: z.array(z.string()).optional(),
  price: z.preprocess(
    value => Number(parseFormattedPrice((value as string) ?? '') ?? 0),
    z.number().min(0).optional()
  ),
  quantity: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  sku: z.string().optional(),
  published: z.boolean(),
  onlineOnly: z.boolean()
} satisfies MakeAny<ProductDetailsFormInput>);

export type ProductDetailsFormInput = {
  name: string;
  slug: string;
  description: string;
  assets: File[];
  prevAssets: string[];
  price: number;
  sku: string;
  quantity: number;
  published: boolean;
  onlineOnly: boolean;
};
