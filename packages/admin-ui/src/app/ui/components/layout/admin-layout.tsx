import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

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
            <Button variant="ghost" className="flex gap-2 justify-start text-base">
              <PackageIcon size={16} /> Inventory
            </Button>
            <Button variant="ghost" className="flex gap-2 justify-start text-base">
              <ShoppingCartIcon size={16} /> Orders
            </Button>
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
