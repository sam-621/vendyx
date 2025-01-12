import { type FC, useEffect, useMemo } from 'react';

import { type Args } from '@/api/scalars/scalars.type';
import { type CommonShippingHandlersFragment, type CommonZoneFragment } from '@/api/types';
import { Button } from '@/shared/components/ui/button';
import { DialogClose } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { convertToCent, formatPrice, parsePrice } from '@/shared/utils/formatters';

import { useShippingMethodForm } from './use-shipping-method-form';

export const ShippingMethodForm: FC<Props> = ({ shippingHandlers, methodToUpdate }) => {
  const { method, setValue, handler, setHandler, isLoading, createShippingMethod } =
    useShippingMethodForm(shippingHandlers, methodToUpdate);

  const form: Args = useMemo(() => handler.args, [handler]);

  console.log({
    method
  });

  useEffect(() => {
    setValue({ key: 'handlerId', value: handler.code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="handlerId">Type of shipping method</Label>
        <Select
          name="handlerId"
          // Editing handler id for a shipping method is not supported
          disabled={!!methodToUpdate}
          value={handler.code}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onValueChange={value => setHandler(shippingHandlers.find(h => h.code === value)!)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shippingHandlers.map(handlers => (
              <SelectItem key={handlers.code} value={handlers.code}>
                {handlers.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          defaultValue={method.name}
          onChange={e => setValue({ key: 'name', value: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="desc">Description</Label>
        <Textarea
          name="desc"
          defaultValue={method.description}
          onChange={e => setValue({ key: 'description', value: e.target.value })}
        />
      </div>
      {Object.entries(form).map(([key, arg]) =>
        arg.type === 'price' ? (
          <div key={key} className="flex flex-col gap-2">
            <Label htmlFor={key}>{arg.label}</Label>
            <Input
              name={key}
              placeholder={arg.placeholder}
              isPrice
              defaultValue={
                method.args[key] !== undefined ? formatPrice(Number(method.args[key])) : ''
              }
              onChange={e =>
                setValue({
                  key: 'args',
                  value: {
                    ...method.args,
                    [key]: convertToCent(parsePrice(e.target.value))
                  }
                })
              }
            />
          </div>
        ) : (
          <div key={key} className="flex flex-col gap-2">
            <Label>{arg.label}</Label>
            <Input
              type={arg.type}
              defaultValue={method.args[key]}
              onChange={e =>
                setValue({
                  key: 'args',
                  value: { ...method.args, [key]: e.target.value }
                })
              }
            />
          </div>
        )
      )}
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button isLoading={isLoading} onClick={createShippingMethod}>
          Save
        </Button>
      </div>
    </div>
  );
};

type Props = {
  shippingHandlers: CommonShippingHandlersFragment[];
  /**
   * Optional prop to make the form update a shipping method instead of creating a new one
   */
  methodToUpdate?: CommonZoneFragment['shippingMethods'][0];
};
