import { type FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { useCreateAsset } from '@/app/assets';
import { useProductDetailsContext } from '@/app/products/context';
import { ProductKeys, useUpdateProduct } from '@/app/products/hooks';
import { Dropzone } from '@/lib/components/forms';
import { type CommonProductFragment } from '@/lib/ebloc/codegen/graphql';
import { t } from '@/lib/locales';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';
import { getFileListIntoArray, getFilePreview } from '@/lib/utils';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const AssetDetails: FC<Props> = () => {
  const { createAsset } = useCreateAsset();
  const { updateProduct } = useUpdateProduct();
  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { product } = useProductDetailsContext();

  const defaultAssets = product?.assets?.items ?? [];
  const isCreatingProducts = !product;

  const [previews, setPreviews] = useState<string[]>(defaultAssets.map(asset => asset.source));
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    setValue('assets', files);
  }, [previews]);

  useEffect(() => {
    setPreviews(defaultAssets.map(asset => asset.source));
  }, [product]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('product-details.assets.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Dropzone
          previews={previews}
          onDrop={async droppedFiles => {
            if (isCreatingProducts) {
              // add previews state
              setPreviews([
                ...previews,
                ...getFileListIntoArray(droppedFiles).map(file => getFilePreview(file))
              ]);
              setFiles([...files, ...getFileListIntoArray(droppedFiles)]);
            } else {
              // mark page as loading
              // upload assets
              // update product
              const assets = (await createAsset(getFileListIntoArray(droppedFiles))) ?? [];
              if (!assets.length) {
                notification.error('Failed to upload asset');
                return;
              }

              await updateProduct(product.id, {
                assetsIds: [
                  ...defaultAssets.map(asset => asset.id),
                  ...assets.map(asset => asset.id)
                ]
              });
              console.log({
                products: product.id
              });

              await queryClient.invalidateQueries({ queryKey: ProductKeys.single(product.slug) });

              notification.success('Asset uploaded successfully');
            }
          }}
          className="h-36"
        />
      </CardContent>
    </Card>
  );
};

type Props = {
  assets?: CommonProductFragment['assets'];
};
