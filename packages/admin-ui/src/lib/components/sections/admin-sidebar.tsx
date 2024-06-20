import { Link, useLocation } from 'react-router-dom';

import { cn } from '@ebloc/theme';
import { HomeIcon, PackageIcon, Settings, ShoppingCartIcon, UserIcon } from 'lucide-react';

export const AdminSidebar = () => {
  const { pathname } = useLocation();

  const isInDashboard = pathname.includes('/') && pathname.length === 1;
  const isInOrders = pathname.includes('/orders');
  const isInInventory = pathname.includes('/inventory');

  return (
    <div className="flex flex-1 flex-col justify-between px-4 pb-4">
      <div className="flex flex-col gap-1">
        <Link
          className={cn(
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
            {
              'text-primary bg-muted': isInDashboard,
              'text-muted-foreground': !isInDashboard
            }
          )}
          to="/"
        >
          <HomeIcon size={16} />
          Dashboard
        </Link>
        <Link
          className={cn(
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
            {
              'text-primary bg-muted': isInInventory,
              'text-muted-foreground': !isInInventory
            }
          )}
          to="/inventory"
        >
          <PackageIcon size={16} />
          Inventory
        </Link>
        <Link
          className={cn(
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
            {
              'text-primary bg-muted': isInOrders,
              'text-muted-foreground': !isInOrders
            }
          )}
          to="/orders"
        >
          <ShoppingCartIcon size={16} />
          Orders
          <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground shadow ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </div>
        </Link>
        <Link
          className={cn(
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary'
          )}
          to="#"
        >
          <UserIcon size={16} />
          Customers
        </Link>
      </div>
      <Link
        className={cn(
          'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-primary'
        )}
        to="#"
      >
        <Settings size={16} />
        Settings
      </Link>
    </div>
  );
};
