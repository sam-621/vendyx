import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { PageLayout } from '@/lib/components';

import { CollectionTable } from '../components/collection-table/collection-table';

export const CollectionsPage = () => {
  return (
    <PageLayout
      title="Collections"
      subtitle="Manage your collections"
      actions={
        <Link to="/collections/new">
          <Button className="flex gap-2">
            <PlusIcon size={16} /> New
          </Button>
        </Link>
      }
    >
      <CollectionTable />
    </PageLayout>
  );
};
