import { useParams } from 'react-router-dom';

import { Button } from '@ebloc/theme';

import { LogoLoader, PageLayout } from '@/lib/components';
import { formatDate } from '@/lib/utils';

import { CollectionDetails } from '../components/collection-details/collection-details';
import { useGetCollectionDetails } from '../hooks';

export const CollectionDetailsPage = () => {
  const { id } = useParams();

  const { collection, isLoading } = useGetCollectionDetails(id ?? '');

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <PageLayout
      title={collection.name}
      subtitle={`Added at ${formatDate(new Date(collection.createdAt as string))}`}
      actions={<Button>Save</Button>}
      backUrl="/collections"
    >
      <CollectionDetails collection={collection} />
    </PageLayout>
  );
};
