'use client';

import { type FC } from 'react';

import { type CommonCustomerFragment } from '@/api/types';
import { AdminPageLayout, Button } from '@/lib/shared/components';
import { Form } from '@/lib/shared/form';
import { clean, getFullName } from '@/lib/shared/utils';

import { CustomerDetails } from './customer-details';
import { useCustomerDetailsForm } from './use-customer-details-form';

export const CustomerDetailsForm: FC<Props> = ({ customer }) => {
  const form = useCustomerDetailsForm(customer);

  return (
    <Form {...form}>
      <form onSubmit={form.onSubmit}>
        <AdminPageLayout title={getFullName(clean(customer))} actions={<Button>Save</Button>}>
          <CustomerDetails />
        </AdminPageLayout>
      </form>
    </Form>
  );
};

type Props = {
  customer: CommonCustomerFragment;
};
