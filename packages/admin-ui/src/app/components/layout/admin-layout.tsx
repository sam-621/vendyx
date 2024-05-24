import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Logo } from '../items';
import { AdminSidebar } from '../sections';

export const AdminLayout: FC = () => {
  return (
    <div className="grid grid-cols-10">
      <aside className="col-span-2 px-4 py-8 flex flex-col gap-6 h-screen border-r sticky top-0">
        <div className="pl-4">
          <Logo />
        </div>
        <AdminSidebar />
      </aside>
      <main className="col-span-8">
        <Outlet />
      </main>
    </div>
  );
};
