import { type FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Button, cn, Separator } from '@ebloc/theme';
import { MenuIcon, XIcon } from 'lucide-react';

import { useConfigContext } from '@/app/config/contexts';

import { Logo, UserAvatar } from '../../items';
import { AdminSidebar } from './admin-layout-sidebar';

export const AdminLayout: FC = () => {
  const { branding } = useConfigContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block lg:grid min-h-screen w-full lg:grid-cols-[260px_1fr] xl:grid-cols-[320px_1fr]">
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r gap-4 h-screen sticky top-0 z-10',
          isOpen && 'flex fixed bg-background w-full z-20'
        )}
      >
        <div className="flex justify-between h-16 items-center px-4">
          <div className="flex gap-2">
            <Logo />
            <h1 className="text-base font-medium">{branding.name}</h1>
          </div>
          <div>
            {/* <Button size="icon" variant="ghost">
              <BellIcon size={16} />
            </Button> */}
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="lg:hidden"
            >
              <XIcon size={16} />
            </Button>
          </div>
        </div>
        <AdminSidebar closeSidebar={() => setIsOpen(false)} />
      </aside>
      <div className="h-screen lg:h-auto flex flex-col">
        <div className="sticky top-0 z-10">
          <header className="px-4 flex justify-between items-center h-16 bg-body lg:px-8 lg:justify-end">
            <MenuIcon onClick={() => setIsOpen(true)} className="lg:hidden" size={24} />
            <UserAvatar />
          </header>
          <Separator />
        </div>
        <main className="flex-1 w-full bg-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
