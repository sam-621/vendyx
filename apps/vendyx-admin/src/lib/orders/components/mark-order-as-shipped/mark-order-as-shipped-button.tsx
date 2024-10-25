import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/lib/shared/components';

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
