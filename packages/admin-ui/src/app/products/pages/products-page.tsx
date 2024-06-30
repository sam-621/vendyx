import { Link } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { PageLayout } from '@/lib/components';
import { t } from '@/lib/locales';

import { ProductTable } from '../components/product-table';

export const ProductsPage = () => {
  return (
    <PageLayout
      title="Products"
      subtitle={t('inventory.subtitle')}
      actions={
        <Link to="/products/new">
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
