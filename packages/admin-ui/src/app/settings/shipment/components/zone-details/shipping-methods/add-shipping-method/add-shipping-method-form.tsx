import { type FC } from 'react';

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
  const shippingMethodForm = useShippingMethodForm(zoneId);

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
        <ShippingMethodForm {...shippingMethodForm} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  zoneId: string;
};
