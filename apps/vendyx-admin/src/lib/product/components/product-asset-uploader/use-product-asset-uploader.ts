import { useTransition } from 'react';

import { type CommonProductFragment } from '@/lib/shared/api';

import { addProductImage } from '../../actions';

export const useProductAssetUploader = () => {
  const [isLoading, startTransition] = useTransition();

  const execute = (product: CommonProductFragment, file: File) => {
    startTransition(async () => {
      const newImage = new FormData();
      newImage.append('files', file);

      await addProductImage(product.id, product.assets.items, newImage);
    });
  };

  return {
    isLoading,
    addProductImage: execute
  };
};
