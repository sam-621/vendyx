import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { OrderKeys, useMarkOrderAsShipped } from '@/app/orders/hooks';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

export const useMarkOrderAsShippedForm = (id: string) => {
  const { markOrderAsShipped } = useMarkOrderAsShipped();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: FormInput) => {
    await markOrderAsShipped(id, input);
    await queryClient.invalidateQueries({ queryKey: OrderKeys.single(id) });

    notification.success('Order has been marked as shipped');
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  carrier: z.string().min(1, { message: FormMessages.required }),
  trackingCode: z.string().min(1, { message: FormMessages.required })
} satisfies MakeAny<FormInput>);

type FormInput = {
  carrier: string;
  trackingCode: string;
};
