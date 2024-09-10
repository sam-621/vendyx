import { ThemeSwitcher } from '@/lib/shared/components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid items-center h-screen">
      <div>
        <div className="fixed top-6 right-6">
          <ThemeSwitcher />
        </div>
        <h1 className="text-center text-2xl font-medium mb-12">Vendyx.io</h1>
        {children}
      </div>
    </div>
  );
}
