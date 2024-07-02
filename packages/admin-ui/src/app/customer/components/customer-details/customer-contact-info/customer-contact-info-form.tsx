import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';

import { type CustomerDetailsFormInput } from '../use-customer-details-form';

export const CustomerContactInfoForm: FC<Props> = ({ customer }) => {
  const { register, formState } = useFormContext<CustomerDetailsFormInput>();
  const { errors } = formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col lg:grid grid-cols-2 gap-4">
        <FormInput
          {...register('firstName')}
          error={errors.firstName?.message}
          defaultValue={customer.firstName ?? ''}
          label="First Name"
        />
        <FormInput
          {...register('lastName')}
          error={errors.lastName?.message}
          defaultValue={customer.lastName}
          label="Last Name"
        />
        <FormInput
          {...register('email')}
          error={errors.email?.message}
          defaultValue={customer.email}
          label="Email"
        />
        <FormInput
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
          defaultValue={customer.phoneNumber ?? ''}
          label="Phone Number"
        />
      </CardContent>
    </Card>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
