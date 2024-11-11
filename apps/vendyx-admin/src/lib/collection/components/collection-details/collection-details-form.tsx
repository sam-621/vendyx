'use client';

import { type FC } from 'react';

import { type CommonCollectionFragment } from '@/api/types';
import { AdminPageLayout, Button } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';

import { CollectionDetails } from './collection-details';
import { useCollectionDetailsForm } from './use-collection-details-form';

export const CollectionDetailsForm: FC<Props> = ({ collection }) => {
  const form = useCollectionDetailsForm(collection);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title={collection?.name ?? 'New Collection'}
          actions={
            <Button type="submit" isLoading={form.isLoading}>
              Save
            </Button>
          }
        >
          <CollectionDetails />
        </AdminPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  collection?: CommonCollectionFragment;
};
