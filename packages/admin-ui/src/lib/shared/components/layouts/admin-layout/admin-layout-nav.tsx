import { useLocation } from 'react-router-dom';

import { BoxesIcon, PackageIcon, SettingsIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';

import { AdminLayoutNavItem } from './admin-layout-nav-item';

export const AdminLayoutNav = () => {
  const { pathname } = useLocation();

  const isInProducts = pathname.includes('/products');
  const isInCollections = pathname.includes('/collections');
  const isInOrders = pathname.includes('/orders');
  const isInCustomers = pathname.includes('/customers');
  const isInSettings = pathname.includes('/settings');

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
    <nav className="px-4 mt-2 flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(item => (
          <AdminLayoutNavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
          />
        ))}
      </div>
      <div className="pb-6">
        <AdminLayoutNavItem
          to="/settings"
          label="Settings"
          icon={SettingsIcon}
          isActive={isInSettings}
        />
      </div>
    </nav>
  );
};
