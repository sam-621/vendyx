'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCustomerFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';

export const useCustomerDetailsForm = (customer: CommonCustomerFragment) => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<CustomerDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: customer.firstName ?? '',
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber ?? '',
      enabled: customer.enabled
    }
  });

  async function onSubmit(values: CustomerDetailsFormInput) {
    startTransition(async () => {
      console.log(values);
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  firstName: z.string().min(1, FormMessages.required),
  lastName: z.string().min(1, FormMessages.required),
  email: z.string().email({ message: FormMessages.invalidEmail }),
  phoneNumber: z.string().min(10, FormMessages.invalidPhoneNumber),
  enabled: z.boolean()
});

export type CustomerDetailsFormInput = z.infer<typeof schema>;
