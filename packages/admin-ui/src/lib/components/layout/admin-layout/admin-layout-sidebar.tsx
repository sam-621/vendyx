import { type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@ebloc/theme';
import {
  BoxesIcon,
  GlobeIcon,
  PackageIcon,
  Settings,
  ShoppingCartIcon,
  UserIcon
} from 'lucide-react';

import { useConfigContext } from '@/app/config/contexts';

import { LayoutSidebarItem } from '../layout-sidebar-item';

export const AdminSidebar: FC<Props> = ({ closeSidebar }) => {
  const config = useConfigContext();
  const { pathname } = useLocation();

  const isInProducts = pathname.includes('/products');
  const isInCollections = pathname.includes('/collections');
  const isInOrders = pathname.includes('/orders');
  const isInCustomers = pathname.includes('/customers');

  const SIDEBAR_ITEMS = [
    {
      icon: PackageIcon,
      to: '/products',
      label: 'Products',
      isActive: isInProducts
    },
    {
      icon: BoxesIcon,
      to: '/collections',
      label: 'Collections',
      isActive: isInCollections
    },
    {
      icon: ShoppingCartIcon,
      to: '/orders',
      label: 'Orders',
      isActive: isInOrders
    },
    {
      icon: UserIcon,
      to: '/customers',
      label: 'Customers',
      isActive: isInCustomers
    }
  ];

  return (
    <div className="flex flex-1 flex-col justify-between px-4 pb-4">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(({ label, to, icon, isActive }) => (
          <LayoutSidebarItem
            onClick={closeSidebar}
            key={to}
            icon={icon}
            isActive={isActive}
            to={to}
          >
            {label}
          </LayoutSidebarItem>
        ))}
        {config?.extraUiModules.map(uiModule => (
          <Link
            key={uiModule.slug}
            to={uiModule.slug}
            onClick={closeSidebar}
            className={cn(
              'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary'
            )}
          >
            <GlobeIcon size={16} />
            {uiModule.label}
          </Link>
        ))}
      </div>
      <Link
        className={cn(
          'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary'
        )}
        to="/settings/payments"
      >
        <Settings size={16} />
        Settings
      </Link>
    </div>
  );
};

type Props = {
  closeSidebar: () => void;
};
