'use client';

import { type FC } from 'react';

import { type CommonCustomerFragment } from '@/api/types';
import { AdminPageLayout } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';
import { clean, getFullName } from '@/lib/shared/utils';

import { CustomerDetails } from './customer-details';
import { CustomerDetailsSubmitButton } from './customer-details-submit-button';
import { useCustomerDetailsForm } from './use-customer-details-form';

export const CustomerDetailsForm: FC<Props> = ({ customer }) => {
  const form = useCustomerDetailsForm(customer);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout
          title={getFullName(clean(customer))}
          actions={<CustomerDetailsSubmitButton customer={customer} isLoading={form.isLoading} />}
        >
          <CustomerDetails />
        </AdminPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
