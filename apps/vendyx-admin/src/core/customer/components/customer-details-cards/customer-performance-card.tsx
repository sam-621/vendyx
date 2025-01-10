import { type CommonCustomerFragment } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useEntityContext } from '@/shared/contexts/entity-context';
import { formatPrice } from '@/shared/utils/formatters';

export const CustomerPerformanceCard = () => {
  const { entity: customer } = useEntityContext<CommonCustomerFragment>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <p>
          Orders: <span>{customer.orders.count}</span>
        </p>
        <p>
          Total spent: <span>{<span>{formatPrice(customer.totalSpent)}</span>}</span>
        </p>
      </CardContent>
    </Card>
  );
};
