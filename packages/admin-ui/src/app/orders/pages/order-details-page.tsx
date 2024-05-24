import { Link, Navigate, useParams } from 'react-router-dom';

import { MoveLeftIcon } from 'lucide-react';

import { PageLayout } from '@/app/components';
import { useGetOrderDetails } from '@/app/orders';
import { getFormattedDate } from '@/lib/utils';

import {
  OrderCustomerCard,
  OrderItemsTable,
  OrderPaymentCard,
  OrderShipmentCard
} from '../components/order-details';
import { OrderActions } from '../components/order-more-actions/order-more-actions';
import { TransitionOrderStateButton } from '../components/transition-state-button/transition-state-button';

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
      subtitle={getFormattedDate(new Date(order.createdAt as string))}
      actions={
        <div className="flex gap-4 items-center">
          <TransitionOrderStateButton orderState={order.state} />
          <OrderActions />
        </div>
      }
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
          <OrderPaymentCard payment={order.payment} />
          <OrderShipmentCard shipment={order.shipment} />
        </div>
      </div>
    </PageLayout>
  );
};
