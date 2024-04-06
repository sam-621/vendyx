import { type FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { PackageIcon, ShoppingCartIcon } from 'lucide-react';

import { Logo, UserAvatar } from '../items';

export const AdminLayout: FC = () => {
  return (
    <div className="grid grid-cols-10">
      <aside className="col-span-2 px-4 py-8 flex flex-col gap-6 h-screen border-r sticky top-0">
        <div className="pl-4">
          <Logo />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <Link to="/inventory">
              <Button variant="ghost" className="flex gap-2 justify-start text-base w-full">
                <PackageIcon size={16} /> Inventory
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="ghost" className="flex gap-2 justify-start text-base w-full">
                <ShoppingCartIcon size={16} /> Orders
              </Button>
            </Link>
          </div>
          <div className="pl-4">
            <UserAvatar />
          </div>
        </div>
      </aside>
      <main className="col-span-8">
        <Outlet />
      </main>
    </div>
  );
};
