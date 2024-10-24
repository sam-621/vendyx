'use client';

import { CreditCardIcon, TruckIcon } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

import { LayoutSidebarItem } from '../layout-sidebar-item';

export const SettingsSidebarNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const shop = Array.isArray(params.shop) ? params.shop[0] : params.shop;

  const isInPayments = pathname.includes('/settings/payments');
  const isInShipments = pathname.includes('/settings/shipments');

  const SIDEBAR_ITEMS = [
    {
      icon: CreditCardIcon,
      to: `/shops/${shop}/settings/payments`,
      label: 'Payments',
      isActive: isInPayments
    },
    {
      icon: TruckIcon,
      to: `/shops/${shop}/settings/shipments`,
      label: 'Shipments',
      isActive: isInShipments
    }
  ];

  return (
    <aside className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col gap-1">
        {SIDEBAR_ITEMS.map(({ label, to, icon, isActive }) => (
          <LayoutSidebarItem key={to} href={to} label={label} icon={icon} isActive={isActive} />
        ))}
      </div>
    </aside>
  );
};
