import { type Dispatch, type FC, type SetStateAction, useState } from 'react';

import { clean } from '@ebloc/common';
import {
  Button,
  DialogClose,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch
} from '@ebloc/theme';

import { type PriceCalculator } from '@/app/config/contexts';
import { ArgInput, FormInput, FormTextarea } from '@/lib/components';

import { type AddShippingMethodFormInput } from './use-shipping-method-form';

export const ShippingMethodForm: FC<Props> = ({
  priceCalculators,
  shippingMethod,
  selectedPcCode,
  setSelectedPcCode,
  setShippingMethod,
  onSave,
  isUpdate
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label>Type of shipping method</Label>
        <Select
          disabled={isUpdate}
          defaultValue={selectedPcCode}
          onValueChange={isUpdate ? () => null : value => setSelectedPcCode(value)}
        >
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
      <div className="flex items-end gap-6">
        <FormInput
          className="w-full"
          label="Name"
          placeholder="Express"
          value={shippingMethod.name}
          onChange={e => {
            const value = e.target.value;

            setShippingMethod(prevState => ({
              ...prevState,
              name: value
            }));
          }}
        />
        <div className="flex items-center space-x-2 pb-[6px]">
          <Switch
            id="payment-method-status"
            checked={shippingMethod.enabled}
            onCheckedChange={checked => {
              setShippingMethod(prevState => ({
                ...prevState,
                enabled: checked
              }));
            }}
          />
          <Label htmlFor="payment-method-status" className="cursor-pointer text-base">
            Active
          </Label>
        </div>
      </div>
      <FormTextarea
        label="Description"
        placeholder="Deliver up to 3 to 5 work days"
        value={shippingMethod.description}
        onChange={e => {
          const value = e.target.value;

          setShippingMethod(prevState => ({
            ...prevState,
            description: value
          }));
        }}
      />
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
            value={String(shippingMethod.args[arg.key])}
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
        <Button
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await onSave();
            setIsLoading(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

type Props = {
  priceCalculators: PriceCalculator[];
  shippingMethod: AddShippingMethodFormInput;
  selectedPcCode: string;
  setSelectedPcCode: Dispatch<SetStateAction<string>>;
  setShippingMethod: Dispatch<SetStateAction<AddShippingMethodFormInput>>;
  isUpdate?: boolean;
  onSave: () => Promise<void>;
};
