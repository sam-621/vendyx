import { zodResolver } from '@hookform/resolvers/zod';
import { type MakeAny } from '@vendyx/common';
import { z } from 'zod';

import { useCreateAsset } from '@/core/assets';
import { FormMessages } from '@/core/common';
import {
  useCreateProduct,
  useCreateVariant,
  useUpdateProduct,
  useUpdateVariant
} from '@/core/inventory';
import { InventoryKeys } from '@/core/inventory/inventory.keys';
import { useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

/**
 * Hook to handle the product details form
 * @param update If provided, the form will update the product with the given id
 * @returns Form methods and state
 */
export const useProductDetailsForm = (update?: { productId: string; variantId: string }) => {
  const { createAsset } = useCreateAsset();
  const { createProduct } = useCreateProduct();
  const { createVariant } = useCreateVariant();
  const { updateProduct } = useUpdateProduct();
  const { updateVariant } = useUpdateVariant();

  const methods = useForm<ProductDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: ProductDetailsFormInput) => {
    try {
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

      if (update?.productId && update?.variantId) {
        const { productId, variantId } = update;

        await updateProduct(productId, productInput);
        await updateVariant(variantId, variantInput);
        await queryClient.invalidateQueries({ queryKey: InventoryKeys.all });

        notification.success('Product updated');
      } else {
        const createdProductId = await createProduct(productInput);

        await createVariant(createdProductId, variantInput);
        notification.success(`Product ${input.name} created with id ${createdProductId}`);
      }
    } catch (error) {
      notification.error('An error occurred');
    }
  };

  return {
    onSubmit: methods.handleSubmit(onSubmit),
    ...methods
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.maxChars(3)),
  slug: z.string().min(3, FormMessages.maxChars(3)),
  description: z.string().optional(),
  assets: z.any(),
  prevAssets: z.array(z.string()).optional(),
  price: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  quantity: z.preprocess(value => Number(value ?? 0), z.number().min(0).optional()),
  sku: z.string().min(3, FormMessages.minChars(3)),
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
