import { useEffect, useState, useTransition } from 'react';

import { type ID } from '@/api/scalars/scalars.type';
import { notification } from '@/shared/notifications/notifications';

import { addVariantImage } from '../../actions/add-variant-image';
import { useVariantContext } from '../../contexts/variant.context';

export const useVariantAssetUploader = () => {
  const { product } = useVariantContext();
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Image uploaded successfully');
    }
  }, [isLoading, isSuccess]);

  const execute = (variantsIds: ID[], file: File) => {
    if (!product?.id) {
      throw new Error('Product ID is required');
    }

    startTransition(async () => {
      const image = new FormData();
      image.append('files', file);

      await addVariantImage(variantsIds, image, product?.id);
      setIsSuccess(true);
    });
  };

  return {
    isLoading,
    addVariantImage: execute
  };
};
