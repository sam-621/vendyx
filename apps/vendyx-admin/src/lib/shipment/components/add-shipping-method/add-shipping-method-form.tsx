import { type FC } from 'react';

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

import { useAddShippingMethodForm } from './use-add-shipping-method-form';

export const AddShippingMethodForm: FC<Props> = ({ shippingHandlers }) => {
  const shippingHandler = shippingHandlers[0];
  const { method, setValue, createShippingMethod } = useAddShippingMethodForm();

  const form: Metadata[] = JSON.parse(String(shippingHandler.metadata));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label>Type of shipping method</Label>
        <Select defaultValue={shippingHandler.id}>
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
      {form.map(({ key, label, type }) => (
        <div key={key} className="flex flex-col gap-2">
          <Label>{label}</Label>
          <Input
            type={type}
            onChange={e =>
              setValue({ key: 'args', value: { ...method.args, [key]: e.target.value } })
            }
          />
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button onClick={createShippingMethod}>Save</Button>
      </div>
    </div>
  );
};

type Props = {
  shippingHandlers: CommonShippingHandlersFragment[];
};
