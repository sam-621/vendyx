import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars';
import { OrderService } from '@/api/services';
import {
  OrderCustomerCard,
  OrderItemsTable,
  OrderPaymentCard,
  OrderShipmentCard,
  OrderStatusTransitionButton
} from '@/lib/orders/components';
import { AdminPageLayout } from '@/lib/shared/components';
import { EntityProvider } from '@/lib/shared/contexts';

export default async function OrderDetails({ params }: { params: { id: ID } }) {
  const order = await OrderService.getById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <EntityProvider entity={order}>
      <AdminPageLayout
        title={order.code}
        actions={
          <div className="flex gap-2 lg:gap-4 items-center">
            <OrderStatusTransitionButton order={order} />
          </div>
        }
      >
        <div className="flex flex-col lg:grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <OrderItemsTable order={order} />
          </div>
          <div className="col-span-1 flex flex-col gap-6">
            <OrderCustomerCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderShipmentCard order={order} />
          </div>
        </div>
      </AdminPageLayout>
    </EntityProvider>
  );
}
