'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCollectionFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment) => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<CollectionDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      description: collection?.description ?? '',
      enabled: collection?.enabled ?? true
    }
  });

  async function onSubmit(input: CollectionDetailsFormInput) {
    startTransition(() => {
      console.log(input);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  enabled: z.boolean()
});

export type CollectionDetailsFormInput = z.infer<typeof schema>;
