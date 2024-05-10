import { Link, Navigate, useParams } from 'react-router-dom';

import { Button } from '@vendyx/theme';
import { MoveLeftIcon } from 'lucide-react';

import { PageLayout } from '@/components/layout';
import { useGetOrderDetails } from '@/core/orders';

import {
  OrderCustomerCard,
  OrderItemsTable,
  OrderPaymentCard,
  OrderShipmentCard
} from '../components/order-details';

export const OrderDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { order, isLoading } = useGetOrderDetails(slug ?? '');

  // TODO: LOADING
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: NOT FOUND
  if (!order) {
    return <Navigate to="/orders" />;
  }

  return (
    <PageLayout
      title={`# ${order.code}`}
      // subtitle={"Aug 21 at 9:32 am"}
      subtitle={order.createdAt}
      actions={<Button type="button">Marcar como enviado</Button>}
      icon={
        <Link to={'/orders'}>
          <MoveLeftIcon />
        </Link>
      }
    >
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <OrderItemsTable order={order} />
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <OrderCustomerCard address={order.shippingAddress} customer={order.customer} />
          <OrderPaymentCard />
          <OrderShipmentCard />
        </div>
      </div>
    </PageLayout>
  );
};
