import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/lib/shared/components';

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
        {/* <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <FormInput
            {...register('carrier')}
            label="Carrier"
            type="text"
            error={errors.carrier?.message}
          />
          <FormInput
            {...register('trackingCode')}
            label="Tracking number"
            type="text"
            error={errors.trackingCode?.message}
          />
          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" isLoading={isSubmitting}>
              Mark as sent
            </Button>
          </div>
        </form> */}
      </DialogContent>
    </Dialog>
  );
};
