import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog';
import { useEntityContext } from '@/shared/contexts/entity-context';

import { type ShipmentContext } from '../../contexts/shipment-context';
import { ShippingMethodForm } from '../shipping-method-form/shipping-method-form';

export const UpdateShippingMethodButton: FC<Props> = ({ method }) => {
  const {
    entity: { shippingHandlers }
  } = useEntityContext<ShipmentContext>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:underline cursor-pointer">{method.name}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{method.name}</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm shippingHandlers={shippingHandlers} methodToUpdate={method} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  method: CommonZoneFragment['shippingMethods'][0];
};
