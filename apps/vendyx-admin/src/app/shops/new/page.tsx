import Link from 'next/link';

import { ThemeSwitcher } from '@/lib/shared/components';
import { CreateShopForm } from '@/lib/shop/components';

export default function NewShopPage() {
  return (
    <div className="grid h-screen">
      <div className="py-32">
        <div className="fixed top-6 right-6">
          <ThemeSwitcher />
        </div>

        <h1 className="text-center text-2xl font-medium mb-12 w-screen">
          <Link href="/shops">Vendyx</Link>
        </h1>
        <CreateShopForm />
      </div>
    </div>
  );
}
