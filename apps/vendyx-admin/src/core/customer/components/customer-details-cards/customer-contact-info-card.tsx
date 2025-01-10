import { useFormContext } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { FormInput } from '@/shared/form/form-input';
import { FormPhoneInput } from '@/shared/form/form-phone-input';

import { type CustomerDetailsFormInput } from '../customer-details/use-customer-details-form';

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
