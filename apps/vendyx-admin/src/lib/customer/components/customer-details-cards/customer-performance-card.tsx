import { type CommonCustomerFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';
import { formatPrice } from '@/lib/shared/utils';

export const CustomerPerformanceCard = () => {
  const { entity: customer } = useEntityContext<CommonCustomerFragment>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <p>
          Orders: <span>{customer.orders.items.length}</span>
        </p>
        <p>
          Total spent: <span>{<span>{formatPrice(customer.totalSpent)}</span>}</span>
        </p>
      </CardContent>
    </Card>
  );
};
