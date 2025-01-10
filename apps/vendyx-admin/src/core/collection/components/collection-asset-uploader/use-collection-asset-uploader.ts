import { useTransition } from 'react';

import { type CommonCollectionFragment } from '@/api/types';

import { addCollectionImage } from '../../actions/add-collection-image';

export const useCollectionAssetUploader = () => {
  const [isLoading, startTransition] = useTransition();

  const execute = (collection: CommonCollectionFragment, file: File) => {
    startTransition(async () => {
      const image = new FormData();
      image.append('files', file);

      await addCollectionImage(collection.id, image);
    });
  };

  return {
    isLoading,
    addCollectionImage: execute
  };
};
