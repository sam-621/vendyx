import { Button, Card, CardContent, CardHeader, CardTitle } from '@vendyx/theme';
import { PlusIcon } from 'lucide-react';

import { FormInput } from '@/components/forms';

export const VariantDetails = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle>Variants</CardTitle>
        <Button
          variant="ghost"
          className="text-distinct flex gap-2 hover:bg-distinct/10 hover:text-distinct"
        >
          <PlusIcon size={16} /> Add options
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Stateless */}
        <div className="flex gap-4">
          <FormInput label="Price" placeholder="$ 0.00" />
          <FormInput label="SKU" placeholder="SKU - 000" />
          <FormInput label="Quantity" placeholder="0" />
        </div>

        {/* Filled */}
        {/* <div className="flex flex-col gap-6"> */}
        <div className="flex flex-col gap-4">
          {/* Filling */}
          {/* <div className='flex items-end gap-4'>
              <FormInput label='Options' placeholder='Size' />
              <Button variant='ghost' size='icon'>
                <Trash2Icon size={16} />
              </Button>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Values</Label>
              <Input />
              <Input />
            </div>
            <div>
              <Button variant='outline'>Done</Button>
            </div> */}

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
        </div>

        {/* <div>
            <Separator />
            <Button variant="link" className="text-distinct hover:no-underline">
              <PlusIcon size={16} /> Add option
            </Button>
            <Separator />
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
