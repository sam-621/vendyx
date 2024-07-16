import { type FC } from 'react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@ebloc/theme';
import { MoreHorizontalIcon } from 'lucide-react';

import { type CommonZoneFragment } from '@/lib/ebloc/codegen/graphql';

import { RemoveShippingMethod } from '../remove-shipping-method/remove-shipping-method-button';
import { UpdateShippingMethodForm } from '../update-shipping-method/update-shipping-method-form';

export const ShippingMethodsTableActions: FC<Props> = ({ zoneId, shippingMethod }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdateShippingMethodForm zoneId={zoneId} shippingMethod={shippingMethod} />
        <RemoveShippingMethod zoneId={zoneId} shippingMethod={shippingMethod} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  zoneId: string;
  shippingMethod: CommonZoneFragment['shippingMethods']['items'][0];
};
