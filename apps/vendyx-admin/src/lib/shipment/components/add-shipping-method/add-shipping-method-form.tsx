import { type FC, useEffect, useMemo } from 'react';

import { type CommonShippingHandlersFragment, type Metadata } from '@/api';
import {
  Button,
  DialogClose,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Textarea
} from '@/lib/shared/components';
import { convertToCent, parsePrice } from '@/lib/shared/utils';

import { useAddShippingMethodForm } from './use-add-shipping-method-form';

export const AddShippingMethodForm: FC<Props> = ({ shippingHandlers }) => {
  const { method, setValue, handler, setHandler, isLoading, createShippingMethod } =
    useAddShippingMethodForm(shippingHandlers);

  const form: Metadata[] = useMemo(() => JSON.parse(String(handler.metadata)), [handler]);

  useEffect(() => {
    setValue({ key: 'handlerId', value: handler.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label>Type of shipping method</Label>
        <Select
          value={handler.id}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onValueChange={value => setHandler(shippingHandlers.find(h => h.id === value)!)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {shippingHandlers.map(handlers => (
              <SelectItem key={handlers.id} value={handlers.id}>
                {handlers.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input onChange={e => setValue({ key: 'name', value: e.target.value })} />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Description</Label>
        <Textarea onChange={e => setValue({ key: 'description', value: e.target.value })} />
      </div>
      {form.map(({ key, label, type }) =>
        type === 'price' ? (
          <div key={key} className="flex flex-col gap-2">
            <Label>{label}</Label>
            <Input
              placeholder="$ 0.00"
              isPrice
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
            <Label>{label}</Label>
            <Input
              type={type}
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
};
