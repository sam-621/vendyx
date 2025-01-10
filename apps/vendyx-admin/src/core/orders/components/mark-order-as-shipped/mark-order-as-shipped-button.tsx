import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/components/ui/dialog';

import { MarkOrderAsSHippedForm } from './mark-order-as-shipped-form';

export const MarkOrderAsShippedButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Mark as sent</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as sent</DialogTitle>
          <DialogDescription>Mark this order as sent and notify the user</DialogDescription>
        </DialogHeader>
        <MarkOrderAsSHippedForm />
      </DialogContent>
    </Dialog>
  );
};
