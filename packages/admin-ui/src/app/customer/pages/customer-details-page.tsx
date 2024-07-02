import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { clean } from '@ebloc/common';

import { LogoLoader, PageLayout } from '@/lib/components';
import { formatDate, getFullName } from '@/lib/utils';

import { CustomerDetails } from '../components/customer-details/customer-details';
import { CustomerDetailsSubmitButton } from '../components/customer-details/customer-details-submit-button';
import { useCustomerDetailsForm } from '../components/customer-details/use-customer-details-form';
import { useGetCustomerDetails } from '../hooks';

export const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { customer, isLoading } = useGetCustomerDetails(id ?? '');

  const form = useCustomerDetailsForm(customer);

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.onSubmit}>
        <PageLayout
          title={getFullName(clean(customer))}
          subtitle={`Added at ${formatDate(new Date(customer.createdAt as string))}`}
          actions={<CustomerDetailsSubmitButton customer={customer} />}
          backUrl="/customers"
          stickyHeader
        >
          <CustomerDetails customer={customer} />
        </PageLayout>
      </form>
    </FormProvider>
  );
};
