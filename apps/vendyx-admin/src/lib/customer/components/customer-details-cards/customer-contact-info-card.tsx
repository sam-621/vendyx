import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/lib/shared/components';
import { FormInput, FormPhoneInput } from '@/lib/shared/form';

import { type CustomerDetailsFormInput } from '../customer-details';

export const CustomerContactInfoCard = () => {
  const { control } = useFormContext<CustomerDetailsFormInput>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col lg:grid grid-cols-2 gap-4">
        <FormInput control={control} name="firstName" label="First Name" />
        <FormInput control={control} name="lastName" label="Last Name" />
        <FormInput control={control} name="email" label="Email" />
        <FormPhoneInput control={control} name="phoneNumber" label="Phone Number" />
      </CardContent>
    </Card>
  );
};
