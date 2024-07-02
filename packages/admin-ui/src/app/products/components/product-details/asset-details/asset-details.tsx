import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useProductDetailsContext } from '@/app/products/context';
import { ProductKeys, useUpdateProduct } from '@/app/products/hooks';
import { AssetsForm } from '@/lib/components/forms';
import { queryClient } from '@/lib/query-client';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const AssetDetails: FC = () => {
  const { updateProduct } = useUpdateProduct();
  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { product } = useProductDetailsContext();

  const defaultAssets = product?.assets?.items ?? [];
  const isCreatingProduct = !product;

  return (
    <AssetsForm
      allAssets={defaultAssets}
      localStateMode={isCreatingProduct}
      onFilesInMemoryChange={files => setValue('assets', files)}
      onNewAssets={async assets => {
        await updateProduct(product?.id ?? '', {
          assetsIds: assets
        });
      }}
      onFinishMutations={async () => {
        await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product?.slug ?? '') });
      }}
    />
  );
};
