import {
  CustomerContactInfoCard,
  CustomerPerformanceCard,
  CustomerStatusSwitchCard
} from '../customer-details-cards';
import { CustomerOrdersTable } from '../customer-orders-table';

export const CustomerDetails = () => {
  return (
    <div className="flex flex-col lg:grid grid-cols-4 gap-6">
      <div className="col-span-3 flex flex-col gap-6">
        <CustomerContactInfoCard />

        <CustomerOrdersTable />
      </div>
      <div className="col-span-1 flex flex-col gap-6">
        <CustomerStatusSwitchCard />

        <CustomerPerformanceCard />
      </div>
    </div>
  );
};
