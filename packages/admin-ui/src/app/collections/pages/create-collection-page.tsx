import { FormProvider } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { PageLayout } from '@/lib/components';

import { CollectionDetails } from '../components/collection-details/collection-details';
import { useCollectionDetailsForm } from '../components/collection-details/use-collection-details-form';

export const CreateCollectionPage = () => {
  const form = useCollectionDetailsForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <PageLayout
          title="Create Collection"
          subtitle={`Create a collection to group your products.`}
          actions={<Button type="submit">Create</Button>}
          backUrl="/collections"
        >
          <CollectionDetails />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
