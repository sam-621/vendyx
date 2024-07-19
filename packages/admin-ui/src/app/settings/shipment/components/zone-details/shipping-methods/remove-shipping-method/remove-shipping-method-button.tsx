import { type FC } from 'react';

import { ShipmentKeys, useRemoveShippingMethod } from '@/app/settings/shipment/hooks';
import { EntityRemoveButton } from '@/lib/components';
import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const RemoveShippingMethodButton: FC<Props> = ({ zoneId, shippingMethod }) => {
  const { removeShippingMethod } = useRemoveShippingMethod();

  const onRemove = async () => {
    const { error } = await removeShippingMethod(shippingMethod.id);

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ShipmentKeys.single(zoneId) });
    notification.success(`Shipping method "${shippingMethod.name}" has been removed.`);
  };

  return (
    <EntityRemoveButton
      title={`Remove shipping method "${shippingMethod.name}"`}
      description="You will not be able to accept orders with this shipping method. This action cannot be undone."
      onRemove={onRemove}
      trigger="icon"
    />
  );
};

type Props = {
  zoneId: string;
  shippingMethod: CommonZoneFragment['shippingMethods']['items'][0];
};
