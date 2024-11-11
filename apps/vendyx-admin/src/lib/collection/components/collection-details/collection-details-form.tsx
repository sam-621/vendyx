'use client';

import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { AdminPageLayout } from '@/lib/shared/components';
import { EntityProvider } from '@/lib/shared/contexts';
import { Form } from '@/lib/shared/form';

import { CollectionDetails } from './collection-details';
import { CollectionDetailsSubmitButton } from './collection-details-submit-button';
import { useCollectionDetailsForm } from './use-collection-details-form';

export const CollectionDetailsForm: FC<Props> = ({ collection }) => {
  const form = useCollectionDetailsForm(collection);

  return (
    <EntityProvider entity={collection}>
      <Form {...form}>
        <form onSubmit={form.onSubmit}>
          <AdminPageLayout
            title={collection?.name ?? 'New Collection'}
            actions={<CollectionDetailsSubmitButton collection={collection} />}
          >
            <CollectionDetails collection={collection} />
          </AdminPageLayout>
        </form>
      </Form>
    </EntityProvider>
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
