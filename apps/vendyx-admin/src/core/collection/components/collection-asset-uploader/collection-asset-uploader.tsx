import { type FC, type MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonCollectionFragment } from '@/api/types';
import { FileUploader } from '@/shared/components/file-uploader/file-uploader';
import { notification } from '@/shared/notifications/notifications';

import { type CollectionDetailsFormInput } from '../collection-details/use-collection-details-form';
import { useCollectionAssetUploader } from './use-collection-asset-uploader';

export const CollectionAssetUploader: FC<Props> = ({ collection }) => {
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

        addCollectionImage(collection, files[0]);
      }}
      defaultPreviews={collection?.assets.items.length ? [collection.assets.items[0]?.source] : []}
      disabledState={Boolean(collection)}
      max={1}
    />
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
