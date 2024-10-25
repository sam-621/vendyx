import { type FC } from 'react';

import { type CommonZoneFragment } from '@/api/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';

import { type ShipmentContext } from '../../contexts';
import { ShippingMethodForm } from '../shipping-method-form';

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
