import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { CollectionService } from '@/api/services';
import { CollectionDetailsForm } from '@/lib/collection/components';

export default async function CollectionPage({ params }: { params: { id: ID } }) {
  const collection = await CollectionService.getById(params.id);

  if (!collection) {
    notFound();
  }

  return <CollectionDetailsForm collection={collection} />;
}
