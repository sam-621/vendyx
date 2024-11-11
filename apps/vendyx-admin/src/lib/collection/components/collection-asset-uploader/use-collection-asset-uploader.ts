import { useTransition } from 'react';

import { type CommonCollectionFragment } from '@/api/types';

export const useCollectionAssetUploader = () => {
  const [isLoading, startTransition] = useTransition();

  const execute = (collection: CommonCollectionFragment, file: File) => {
    startTransition(async () => {
      const newImage = new FormData();
      newImage.append('files', file);

      // await addProductImage(product.id, product.assets.items, newImage);
      console.log(collection);
    });
  };

  return {
    isLoading,
    addCollectionImage: execute
  };
};
