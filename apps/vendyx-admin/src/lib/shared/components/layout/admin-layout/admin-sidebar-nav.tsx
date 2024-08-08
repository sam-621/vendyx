'use client';

import { BoxesIcon, PackageIcon, SettingsIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { AdminSidebarNavItem } from './admin-sidebar-nav-item';

export const AdminLayoutNav = () => {
  const pathname = usePathname();

  const isInProducts = pathname.includes('/products');
  const isInCollections = pathname.includes('/collections');
  const isInOrders = pathname.includes('/orders');
  const isInCustomers = pathname.includes('/customers');
  const isInSettings = pathname.includes('/settings');

  const SIDEBAR_ITEMS = [
    {
      icon: PackageIcon,
      to: pathname + '/products',
      label: 'Products',
      isActive: isInProducts
    },
    {
      icon: BoxesIcon,
      to: pathname + '/collections',
      label: 'Collections',
      isActive: isInCollections
    },
    {
      icon: ShoppingCartIcon,
      to: pathname + '/orders',
      label: 'Orders',
      isActive: isInOrders
    },
    {
      icon: UserIcon,
      to: pathname + '/customers',
      label: 'Customers',
      isActive: isInCustomers
    }
  ];

  return (
    <nav className="px-4 mt-2 flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(item => (
          <AdminSidebarNavItem
            key={item.to}
            href={item.to}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
          />
        ))}
      </div>
      <div className="pb-6">
        <AdminSidebarNavItem
          href="/settings"
          label="Settings"
          icon={SettingsIcon}
          isActive={isInSettings}
        />
      </div>
    </nav>
  );
};
