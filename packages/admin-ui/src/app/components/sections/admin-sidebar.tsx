import { Link, useLocation } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { PackageIcon, ShoppingCartIcon } from 'lucide-react';

import { t } from '@/lib/locales';

import { UserAvatar } from '../items';

export const AdminSidebar = () => {
  const { pathname } = useLocation();

  const isInOrders = pathname.includes('/orders');
  const isInInventory = pathname.includes('/inventory');

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <Link to="/inventory">
          <Button
            variant={isInInventory ? 'secondary' : 'ghost'}
            className="flex gap-2 justify-start text-base w-full"
          >
            <PackageIcon size={16} /> {t('sidebar.inventory')}
          </Button>
        </Link>
        <Link to="/orders">
          <Button
            variant={isInOrders ? 'secondary' : 'ghost'}
            className="flex gap-2 justify-start text-base w-full"
          >
            <ShoppingCartIcon size={16} /> {t('sidebar.orders')}
          </Button>
        </Link>
      </div>
      <div className="pl-4">
        <UserAvatar />
      </div>
    </div>
  );
};
