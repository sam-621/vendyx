import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator
} from '@vendyx/theme';
import { PlusIcon, Trash2Icon } from 'lucide-react';

import { FormInput } from '@/components/forms';

import { type ProductDetailsFormInput } from '../use-product-details-form';

export const VariantDetails = () => {
  const { register } = useFormContext<ProductDetailsFormInput>();
  const [options, setOptions] = useState<Option[]>([]);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Variants</CardTitle>
        {/* {!options.length && (
          <Button
            variant="ghost"
            className="text-distinct flex gap-2 hover:bg-distinct/10 hover:text-distinct"
            onClick={() => setOptions([...options, new Option()])}
          >
            <PlusIcon size={16} /> Add options
          </Button>
        )} */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Stateless */}
        {!options.length && (
          <div className="flex gap-4">
            <FormInput {...register('price')} type="number" label="Price" placeholder="$ 0.00" />
            <FormInput {...register('sku')} label="SKU" placeholder="SKU - 000" />
            <FormInput {...register('quantity')} type="number" label="Quantity" placeholder="0" />
          </div>
        )}

        {/* add options */}
        {options.map(option => (
          <div key={option.fieldId} className="flex flex-col gap-4">
            <div className="flex items-end gap-4">
              <FormInput
                label="Option"
                placeholder="Size"
                onChange={e =>
                  setOptions(
                    options.map(op =>
                      op.fieldId !== option.fieldId ? op : { ...op, name: e.target.value }
                    )
                  )
                }
              />
              <Button variant="ghost" size="icon">
                <Trash2Icon size={16} />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Values</Label>
              <Input placeholder="S" />
              {option.values.map(value => (
                <Input key={value.fieldId} />
              ))}
            </div>
            <div>
              <Button variant="outline">Done</Button>
            </div>
            <div>
              <Separator />
              <Button variant="link" className="text-distinct hover:no-underline">
                <PlusIcon size={16} /> Add option
              </Button>
              <Separator />
            </div>
          </div>
        ))}

        {/* Filled */}
        {/* <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <Label>Size</Label>
                <div className="flex gap-2">
                  <Badge variant="secondary">S</Badge>
                  <Badge variant="secondary">M</Badge>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <MoreHorizontalIcon size={16} />
              </Button>
            </div> */}

        {/* <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <span>S</span>
              </div>
              <div className="flex gap-2 items-end">
                <FormInput label="Price" placeholder="$ 0.00" />
                <FormInput label="SKU" placeholder="SKU - 000" />
                <FormInput label="Quantity" placeholder="0" />
                <Button variant="ghost" size="icon" className="p-2">
                  <Trash2Icon size={16} />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span>M</span>
              </div>
              <div className="flex gap-2 items-end">
                <FormInput label="Price" placeholder="$ 0.00" />
                <FormInput label="SKU" placeholder="SKU - 000" />
                <FormInput label="Quantity" placeholder="0" />
                <Button variant="ghost" size="icon" className="p-2">
                  <Trash2Icon size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};

class Option {
  fieldId: string = crypto.randomUUID();
  name: string = '';
  values: OptionValue[] = [new OptionValue()];
  /**
   * Whether the option has finished being filled
   */
  checked: boolean = false;
}

class OptionValue {
  fieldId: string = crypto.randomUUID();
  value: string = '';
}
