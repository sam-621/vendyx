import { PlusIcon } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/lib/shared/components';
import { useEntityContext } from '@/lib/shared/contexts';

import { type ShipmentContext } from '../../contexts';
import { ShippingMethodForm } from '../shipping-method-form';

export const AddShippingMethodButton = () => {
  const {
    entity: { shippingHandlers }
  } = useEntityContext<ShipmentContext>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2">
          <PlusIcon size={16} />
          Add Shipping method
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add shipping method</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm shippingHandlers={shippingHandlers} />
      </DialogContent>
    </Dialog>
  );
};
