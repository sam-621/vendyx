import { Link } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { MoveLeftIcon } from 'lucide-react';

import { PageLayout } from '@/components/layout';

import {
  OrderCustomerCard,
  OrderItemsTable,
  OrderPaymentCard,
  OrderShipmentCard
} from '../components/order-details';

export const OrderDetailsPage = () => {
  return (
    <PageLayout
      title="#0001"
      subtitle="Aug 21 at 9:32 am"
      actions={<Button type="button">Marcar como enviado</Button>}
      icon={
        <Link to={'/orders'}>
          <MoveLeftIcon />
        </Link>
      }
    >
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <OrderItemsTable />
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <OrderCustomerCard />
          <OrderPaymentCard />
          <OrderShipmentCard />
        </div>
      </div>
    </PageLayout>
  );
};
