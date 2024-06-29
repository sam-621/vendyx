import { useParams } from 'react-router-dom';

import { clean } from '@ebloc/common';
import { Button } from '@ebloc/theme';

import { LogoLoader, PageLayout } from '@/lib/components';
import { formatDate, getFullName } from '@/lib/utils';

import { CustomerDetails } from '../components/customer-details/customer-details';
import { useGetCustomerDetails } from '../hooks';

export const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { customer, isLoading } = useGetCustomerDetails(id ?? '');

  if (isLoading) {
    return <LogoLoader />;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <PageLayout
      title={getFullName(clean(customer))}
      subtitle={`Added at ${formatDate(new Date(customer.createdAt as string))}`}
      actions={<Button>Save</Button>}
      backUrl="/customers"
    >
      <CustomerDetails customer={customer} />
    </PageLayout>
  );
};
