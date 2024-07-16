import { type FC, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { ShippingMethodForm } from '../shipping-method-form/shipping-method-form';
import { useShippingMethodForm } from '../shipping-method-form/use-shipping-method-form';

export const AddShippingMethod: FC<Props> = ({ zoneId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shippingMethodForm = useShippingMethodForm(zoneId, () => setIsOpen(false));

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
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
        <ShippingMethodForm {...shippingMethodForm} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  zoneId: string;
};
