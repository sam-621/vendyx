import { clean } from '@ebloc/common';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@ebloc/theme';
import { PlusIcon } from 'lucide-react';

import { ArgInput, FormInput, FormTextarea } from '@/lib/components';

import { useAddShippingMethodForm } from './use-add-shipping-method-form';

export const AddShippingMethod = () => {
  const { priceCalculators, selectedPcCode, shippingMethod, setSelectedPcCode, setShippingMethod } =
    useAddShippingMethodForm();

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
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Type of shipping method</Label>
            <Select defaultValue={selectedPcCode} onValueChange={value => setSelectedPcCode(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceCalculators.map(calculator => (
                  <SelectItem key={calculator.code} value={calculator.code}>
                    {calculator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormInput label="Name" placeholder="Express" />
          <FormTextarea label="Description" placeholder="Deliver up to 3 to 5 work days" />
          {priceCalculators
            .find(pc => pc.code === selectedPcCode)
            ?.args.map(arg => (
              <ArgInput
                id={arg.key}
                name={arg.key}
                onChange={value => {
                  setShippingMethod(prevState => ({
                    ...prevState,
                    args: {
                      ...prevState.args,
                      [arg.key]: value
                    }
                  }));
                }}
                value={String((shippingMethod.args as any)[arg.key])}
                {...clean(arg)}
                key={arg.key}
              />
            ))}
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
