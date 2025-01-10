'use client';

import { Button } from '@/shared/components/ui/button';
import { DialogClose } from '@/shared/components/ui/dialog';
import { Form } from '@/shared/form/form';
import { FormInput } from '@/shared/form/form-input';

import { useMarkOrderAsShippedForm } from './use-mark-order-as-shipped-form';

export const MarkOrderAsSHippedForm = () => {
  const form = useMarkOrderAsShippedForm();

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <FormInput control={form.control} name="carrier" label="Carrier" type="text" />
        <FormInput control={form.control} name="trackingCode" label="Tracking number" type="text" />
        <div className="flex gap-2 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" isLoading={form.isLoading}>
            Mark as sent
          </Button>
        </div>
      </form>
    </Form>
  );
};
