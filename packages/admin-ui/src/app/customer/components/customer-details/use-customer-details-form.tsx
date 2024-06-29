import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';

export const useCustomerDetailsForm = (customer: CommonCustomerFragment | null | undefined) => {
  const form = useForm<CustomerDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: CustomerDetailsFormInput) => {
    console.log(input);
  };

  return {
    onSubmit: form.handleSubmit(onSubmit),
    ...form
  };
};

const schema = z.object({
  firstName: z.string().min(1, FormMessages.required),
  lastName: z.string().min(1, FormMessages.required),
  email: z.string().email({ message: FormMessages.invalidEmail }),
  phoneNumber: z.string().min(10, FormMessages.invalidPhoneNumber),
  enabled: z.boolean()
} satisfies MakeAny<CustomerDetailsFormInput>);

export type CustomerDetailsFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  enabled: boolean;
};
