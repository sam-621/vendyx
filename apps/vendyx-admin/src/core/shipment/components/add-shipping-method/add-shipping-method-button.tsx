import { PlusIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
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
