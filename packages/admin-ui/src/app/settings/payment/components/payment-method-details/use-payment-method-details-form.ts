import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonPaymentMethodFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { PaymentKeys, useCreatePaymentMethod, useUpdatePaymentMethod } from '../../hooks';

export const usePaymentMethodDetailsForm = (paymentMethod?: CommonPaymentMethodFragment) => {
  const { createPaymentMethod } = useCreatePaymentMethod();
  const { updatePaymentMethod } = useUpdatePaymentMethod();

  const form = useForm<PaymentMethodDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: paymentMethod?.name ?? '',
      description: paymentMethod?.description ?? '',
      handler: paymentMethod?.handler.code ?? '',
      enabled: paymentMethod?.enabled ?? true
    }
  });

  const onSubmit = async (input: PaymentMethodDetailsFormInput) => {
    if (paymentMethod?.id) {
      await onUpdate(paymentMethod.id, input);
    } else {
      await onCreate(input);
    }
  };

  const onUpdate = async (id: string, input: PaymentMethodDetailsFormInput) => {
    const { error } = await updatePaymentMethod(id, {
      name: input.name,
      description: input.description,
      handler: { code: input.handler, args: [] },
      enabled: input.enabled
    });

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: PaymentKeys.single(id) });
    notification.success('Payment method updated successfully');
  };

  const onCreate = async (input: PaymentMethodDetailsFormInput) => {
    const { error } = await createPaymentMethod({
      name: input.name,
      description: input.description,
      handler: { code: input.handler, args: [] },
      enabled: input.enabled
    });

    if (error) {
      notification.error(error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: PaymentKeys.all });
    notification.success('Payment method created successfully');
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  name: z.string().min(3, FormMessages.minChars(3)),
  description: z.string().optional(),
  handler: z.string(),
  enabled: z.boolean()
} satisfies MakeAny<PaymentMethodDetailsFormInput>);

export type PaymentMethodDetailsFormInput = {
  name: string;
  description: string;
  handler: string;
  enabled: boolean;
};
