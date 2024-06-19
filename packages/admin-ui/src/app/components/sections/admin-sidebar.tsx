import { Link, useLocation } from 'react-router-dom';

import { cn } from '@ebloc/theme';
import { PackageIcon, ShoppingCartIcon } from 'lucide-react';

export const AdminSidebar = () => {
  const { pathname } = useLocation();

  const isInOrders = pathname.includes('/orders');
  const isInInventory = pathname.includes('/inventory');

  return (
    <div className="flex flex-col justify-between px-4">
      <div className="flex flex-col gap-1">
        <Link
          className={cn(
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
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
            'text-sm font-medium flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
            {
              'text-primary bg-muted': isInOrders,
              'text-muted-foreground': !isInOrders
            }
          )}
          to="/orders"
        >
          <ShoppingCartIcon size={16} />
          Orders
          {/* <div className="border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </div> */}
        </Link>
      </div>
    </div>
  );
};
