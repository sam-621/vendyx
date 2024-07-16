import { type FC, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@ebloc/theme';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { ShippingMethodForm } from '../shipping-method-form/shipping-method-form';
import { useShippingMethodForm } from '../shipping-method-form/use-shipping-method-form';

export const UpdateShippingMethodForm: FC<Props> = ({ zoneId, shippingMethod }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shippingMethodForm = useShippingMethodForm(zoneId, () => setIsOpen(false), shippingMethod);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger className="font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground select-none rounded-sm text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground p-0 h-full w-full flex justify-start px-2 py-[6px]">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{shippingMethod.name}</DialogTitle>
        </DialogHeader>
        <ShippingMethodForm isUpdate {...shippingMethodForm} />
      </DialogContent>
    </Dialog>
  );
};

type Props = {
  zoneId: CommonZoneFragment['id'];
  shippingMethod: CommonZoneFragment['shippingMethods']['items'][0];
};
