import { Trash2Icon } from 'lucide-react';

import { Button, Input, Label } from '@/lib/shared/components';
import { FormInput } from '@/lib/shared/form';

export const OptionDetails = () => {
  return (
    <div className="p-4 border rounded-lg flex flex-col gap-4">
      <FormInput name="option" label="Option name" placeholder="Size" />
      <div>
        <Label>Values</Label>
        <div className="flex items-center gap-2">
          <Input placeholder="Small" />
          <Button size="icon" variant="ghost">
            <Trash2Icon size={16} />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button size="sm" variant="destructive">
          Remove
        </Button>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
          <Button size="sm">Done</Button>
        </div>
      </div>
    </div>
  );
};
