import { BellIcon } from 'lucide-react';

import { AdminBreadcrumb, AdminLayoutNav, Button, Logo, UserAvatar } from '@/lib/shared/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[320px_1fr] min-h-screen w-full">
      <aside className="border-r flex flex-col bg-background">
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
        <header className="flex justify-between items-center h-16 px-6">
          <div>
            <AdminBreadcrumb />
          </div>
          <div>
            <UserAvatar />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
