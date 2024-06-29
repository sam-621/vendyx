import { type FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@ebloc/theme';

import { type CommonCustomerFragment } from '@/lib/ebloc/codegen/graphql';

import { type CustomerDetailsFormInput } from './use-customer-details-form';

export const CustomerDetailsSubmitButton: FC<Props> = ({ customer }) => {
  const form = useFormContext<CustomerDetailsFormInput>();
  const values = useWatch({ defaultValue: form.getValues() });

  const isDisabled = !isFormDirty(customer, values as CustomerDetailsFormInput);

  return (
    <Button disabled={isDisabled} isLoading={form.formState.isSubmitting} type="submit">
      Save
    </Button>
  );
};

export const isFormDirty = (
  customer: CommonCustomerFragment,
  formInput: CustomerDetailsFormInput
) => {
  return Object.keys(formInput).some(key => {
    return (customer as any)[key] !== (formInput as any)[key];
  });
};

type Props = {
  customer: CommonCustomerFragment;
};
