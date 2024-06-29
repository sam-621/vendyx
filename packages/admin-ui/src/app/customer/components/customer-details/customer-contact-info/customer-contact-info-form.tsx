import { type FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@ebloc/theme';

import { FormInput } from '@/lib/components';
import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';

export const CustomerContactInfoForm: FC<Props> = ({ customer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        <FormInput label="First Name" defaultValue={customer.firstName ?? ''} />
        <FormInput label="Last Name" defaultValue={customer.lastName} />

        <FormInput label="Email" defaultValue={customer.email} />
        <FormInput label="Phone Number" defaultValue={customer.phoneNumber ?? ''} />
      </CardContent>
    </Card>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
