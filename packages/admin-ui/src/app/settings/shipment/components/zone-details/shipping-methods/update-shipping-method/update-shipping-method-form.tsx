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
      <DialogTrigger asChild>
        <span className="hover:underline cursor-pointer">{shippingMethod.name}</span>
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
