import { Navigate, useParams } from 'react-router-dom';

import { useGetOrderDetails } from '@/app/orders';
import { PageLayout } from '@/lib/components';
import { LogoLoader } from '@/lib/components/loaders';
import { formatDate } from '@/lib/utils';

import {
  OrderCustomerCard,
  OrderItemsTable,
  OrderPaymentCard,
  OrderShipmentCard
} from '../components/order-details';
import { OrderTransitionOrderStateButton } from '../components/order-transition-state-button/order-transition-state-button';

export const OrderDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { order, isLoading } = useGetOrderDetails(slug ?? '');

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!order) {
    return <Navigate to="/orders" />;
  }

  return (
    <PageLayout
      title={`#${order.code}`}
      subtitle={formatDate(new Date(order.createdAt as string))}
      actions={
        <div className="flex gap-2 lg:gap-4 items-center">
          <OrderTransitionOrderStateButton order={order} />
          {/* <OrderActions /> */}
        </div>
      }
      backUrl="/orders"
    >
      <div className="flex flex-col lg:grid grid-cols-4 gap-6">
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
