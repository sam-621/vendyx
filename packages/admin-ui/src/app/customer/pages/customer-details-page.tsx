import { Link, useParams } from 'react-router-dom';

import { clean, getFormattedPrice } from '@ebloc/common';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ebloc/theme';

import { FormInput, LogoLoader, OrderStatusBadge, PageLayout } from '@/lib/components';
import { formatDate, getFullName } from '@/lib/utils';

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

  const orders = customer.orders.items;
  const totalSpent = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <PageLayout
      title={getFullName(clean(customer))}
      subtitle={`Added at ${formatDate(new Date(customer.createdAt as string))}`}
      actions={<Button>Save</Button>}
      backUrl="/customers"
      className={{
        main: 'grid grid-cols-4 gap-6'
      }}
    >
      <div className="col-span-3 flex flex-col gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link to={`/orders/${order.id}`} className="w-full hover:underline">
                        #{order.code}
                      </Link>
                    </TableCell>
                    <TableCell>{formatDate(new Date(order.placedAt as string))}</TableCell>
                    <TableCell>{order.shipment?.method.name}</TableCell>
                    <TableCell>{getFormattedPrice(order.total)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.state} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-4 mt-6">
            <Label className="text-base">Customer status</Label>
            <div className="flex items-center space-x-2">
              <Switch id="customer-status" defaultChecked={customer.enabled} />
              <Label htmlFor="customer-status" className="cursor-pointer">
                Active
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <p>
              Orders: <span>{orders.length}</span>
            </p>
            <p>
              Total spent: <span>{<span>{getFormattedPrice(totalSpent)}</span>}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};
