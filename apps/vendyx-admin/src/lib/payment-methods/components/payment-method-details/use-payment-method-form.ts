import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonPaymentIntegrationFragment } from '@/lib/shared/api';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { createPaymentMethod } from '../../actions';

export const usePaymentMethodForm = (integrations: CommonPaymentIntegrationFragment[]) => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<PaymentMethodFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      integration: integrations[0].id,
      metadata: {},
      enabled: true
    }
  });

  async function onSubmit(values: PaymentMethodFormInput) {
    startTransition(async () => {
      if (!Object.keys(values.metadata).length) {
        notification.error('Provider metadata is required');
        return;
      }

      await createPaymentMethod({
        enabled: values.enabled,
        integrationId: values.integration,
        metadata: values.metadata
      });
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
