import { type FC, type MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonProductFragment } from '@/api';
import { FileUploader } from '@/components/shared';
import { notification } from '@/lib/notifications';

import { type ProductDetailsFormInput } from '../product-details/use-product-details-form';
import { useProductAssetUploader } from './use-product-asset-uploader';

export const ProductAssetUploader: FC<Props> = ({ product }) => {
  const { setValue } = useFormContext<ProductDetailsFormInput>();
  const { isLoading, addProductImage } = useProductAssetUploader();
  const notificationRef: MutableRefObject<string | number | null> = useRef(null);

  useEffect(() => {
    if (isLoading) {
      notificationRef.current = notification.loading('Uploading image...');
    }

    if (!isLoading && notificationRef.current) {
      notification.dismiss(notificationRef.current);
      notification.success('Image uploaded');
    }
  }, [isLoading]);

  return (
    <FileUploader
      onAcceptFiles={files => {
        if (!product) {
          setValue('images', files);
          return;
        }

        addProductImage(product, files[0]);
      }}
      defaultPreviews={product?.assets.items.map(asset => asset.source)}
      dissabledState={Boolean(product)}
    />
  );
};

type Props = {
  product?: CommonProductFragment;
};
