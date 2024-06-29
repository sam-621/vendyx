import { type MakeAny } from '@ebloc/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCustomerFragment, CustomerErrorCode } from '@/lib/ebloc/codegen/graphql';
import { FormMessages, useForm } from '@/lib/form';
import { notification } from '@/lib/notifications';
import { queryClient } from '@/lib/query-client';

import { CustomersKeys, useUpdateCustomer } from '../../hooks';

export const useCustomerDetailsForm = (customer: CommonCustomerFragment | null | undefined) => {
  const { updateCustomer } = useUpdateCustomer();

  const form = useForm<CustomerDetailsFormInput>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (input: CustomerDetailsFormInput) => {
    if (!customer) {
      return;
    }

    const result = await updateCustomer(customer.id, input);

    if (result.error) {
      if (
        result.errorCode === CustomerErrorCode.EmailAlreadyExists ||
        result.errorCode === CustomerErrorCode.InvalidEmail
      ) {
        form.setError('email', { message: result.message });
        return;
      }

      notification.error(result.message ?? '');
      return;
    }

    await queryClient.invalidateQueries({ queryKey: CustomersKeys.single(customer.id) });
    notification.success('Customer updated');
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
