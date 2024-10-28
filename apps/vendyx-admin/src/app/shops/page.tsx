import { ShopService } from '@/api/services';
import { ThemeSwitcher } from '@/lib/shared/components';
import { ShopsList } from '@/lib/shop/components';

export default async function ShopsPage() {
  const shops = await ShopService.getAll();

  return (
    <div className="grid h-screen">
      <div className="py-32">
        <div className="fixed top-6 right-6">
          <ThemeSwitcher />
        </div>
        <h1 className="text-center text-2xl font-medium mb-12">Vendyx</h1>
        <ShopsList shops={shops} />
      </div>
    </div>
  );
}
