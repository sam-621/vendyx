import { type MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { FileUploader } from '@/lib/shared/components';
import { notification } from '@/lib/shared/notifications';

import { type CollectionDetailsFormInput } from '../collection-details';
import { useCollectionAssetUploader } from './use-collection-asset-uploader';

export const CollectionAssetUploader = () => {
  const collection = null;
  const { setValue } = useFormContext<CollectionDetailsFormInput>();
  const { isLoading, addCollectionImage } = useCollectionAssetUploader();
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
      title="Image"
      onAcceptFiles={files => {
        if (!collection) {
          setValue('image', files[0]);
          return;
        }

        console.log('Persist');

        addCollectionImage(collection, files[0]);
      }}
      // defaultPreviews={product?.assets.items.map(asset => asset.source)}
      defaultPreviews={[]}
      disabledState={Boolean(collection)}
      max={1}
    />
  );
};
