import { ShopService, UserService } from '@/api/services';
import { OtpWrapper } from '@/lib/auth/wrappers';
import { UserAvatar } from '@/lib/shared/components';
import { ShopsList } from '@/lib/shop/components';

export default async function ShopsPage() {
  const shops = await ShopService.getAll();
  const user = await UserService.whoami();

  return (
    <OtpWrapper>
      <div className="grid h-screen">
        <div className="py-32">
          <div className="fixed top-6 right-6">
            <UserAvatar />
          </div>
          <h1 className="text-center text-2xl font-medium mb-12">Vendyx</h1>
          <ShopsList shops={shops} user={user} />
        </div>
      </div>
    </OtpWrapper>
  );
}
