import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { createPaymentMethod } from '@/actions/payment/create-payment-method';
import { updatePaymentMethod } from '@/actions/payment/update-payment-method';
import { type CommonPaymentIntegrationFragment, type CommonPaymentMethodFragment } from '@/api';
import { FormMessages } from '@/lib/form';
import { notification } from '@/lib/notifications';

export const usePaymentMethodForm = (
  integrations: CommonPaymentIntegrationFragment[],
  method?: CommonPaymentMethodFragment
) => {
  const [isLoading, startTransition] = useTransition();

  const defaultIntegration = method
    ? integrations.find(i => i.name === method.name) ?? integrations[0]
    : integrations[0];

  const form = useForm<PaymentMethodFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      integration: defaultIntegration.id,
      metadata: method?.integrationMetadata ?? {},
      enabled: method?.enabled ?? true
    }
  });

  async function onSubmit(values: PaymentMethodFormInput) {
    const integrationSelected = integrations.find(i => i.id === values.integration);

    const allMetadataIsFilled =
      Object.values(values.metadata).every(value => !!value) &&
      integrationSelected?.metadata.length === Object.values(values.metadata).length;

    if (!Object.values(values.metadata).length || !allMetadataIsFilled) {
      notification.error('Provider metadata is required');
      return;
    }

    startTransition(async () => {
      if (method) {
        await updatePaymentMethod(method.id, values);

        notification.success('Payment method updated');
      } else {
        await createPaymentMethod({
          enabled: values.enabled,
          integrationId: values.integration,
          metadata: values.metadata
        });
      }
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  integration: z.string().min(1, FormMessages.required),
  metadata: z.record(z.any(), z.any()),
  enabled: z.boolean().optional().default(true)
});

export type PaymentMethodFormInput = z.infer<typeof schema>;
