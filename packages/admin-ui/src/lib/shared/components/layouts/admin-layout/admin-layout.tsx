import { Outlet } from 'react-router-dom';

import { Button } from '@ebloc/theme';
import { BellIcon } from 'lucide-react';

import { Logo } from '../../logo';
import { AdminLayoutNav } from './admin-layout-nav';

export const AdminLayout = () => {
  return (
    <div className="grid grid-cols-[320px_1fr] min-h-screen w-full">
      <aside className="border-r flex flex-col bg-muted/40">
        <header className="h-16 flex items-center justify-between px-6 border-b">
          <div className="flex gap-2">
            <Logo />
            <span>Ebloc</span>
          </div>
          <div>
            <Button size={'icon'} variant="outline">
              <BellIcon size={16} />
            </Button>
          </div>
        </header>
        <AdminLayoutNav />
      </aside>
      <main className="flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};
