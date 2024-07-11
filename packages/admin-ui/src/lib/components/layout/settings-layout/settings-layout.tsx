import { Link, Outlet, useLocation } from 'react-router-dom';

import { Button, Separator } from '@ebloc/theme';
import { CreditCardIcon, Globe2Icon, TruckIcon, XIcon } from 'lucide-react';

import { LayoutSidebarItem } from '../layout-sidebar-item';

export const SettingLayout = () => {
  const { pathname } = useLocation();

  const isInPayments = pathname.includes('/settings/payments');
  const isInShipments = pathname.includes('/settings/shipments');
  const isInCountries = pathname.includes('/settings/countries');

  const SIDEBAR_ITEMS = [
    {
      icon: CreditCardIcon,
      to: '/settings/payments',
      label: 'Payments',
      isActive: isInPayments
    },
    {
      icon: TruckIcon,
      to: '/settings/shipments',
      label: 'Shipments',
      isActive: isInShipments
    },
    {
      icon: Globe2Icon,
      to: '/settings/countries',
      label: 'Countries',
      isActive: isInCountries
    }
  ];

  return (
    <div className="mx-8 my-8 flex flex-col gap-6">
      <header className="px-4 flex justify-between items-start">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground text-base">
            Manage your account settings, payments and shipments.
          </p>
        </div>
        <div>
          <Link to="/products">
            <Button size="icon" variant="secondary">
              <XIcon size={16} />
            </Button>
          </Link>
        </div>
      </header>
      <Separator className="mx-4" />
      <div className="grid lg:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr]">
        <aside className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1">
            {SIDEBAR_ITEMS.map(({ label, to, icon, isActive }) => (
              <LayoutSidebarItem key={to} icon={icon} isActive={isActive} to={to}>
                {label}
              </LayoutSidebarItem>
            ))}
          </div>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
