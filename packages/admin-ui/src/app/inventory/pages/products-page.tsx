import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { PageLayout } from '@/app/components';
import { t } from '@/lib/locales';

import { ProductTable } from '../components/product-table';

export const ProductsPage = () => {
  return (
    <PageLayout
      title={t('inventory.title')}
      subtitle={t('inventory.subtitle')}
      actions={
        <Link to="/inventory/new">
          <Button className="flex gap-2">
            <PlusIcon size={16} /> {t('inventory.action.new')}
          </Button>
        </Link>
      }
    >
      <ProductTable />
    </PageLayout>
  );
};
