import { DialogTrigger } from '@radix-ui/react-dialog';
import { PlusIcon } from 'lucide-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/shared';

export const ZoneCountriesSelector = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-distinct" variant="link" type="button">
          <PlusIcon size={16} />
          Add countries
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add countries</DialogTitle>
          <DialogDescription>Add countries to your zone</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
