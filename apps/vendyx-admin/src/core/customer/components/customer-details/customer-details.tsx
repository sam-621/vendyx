import { CustomerContactInfoCard } from '../customer-details-cards/customer-contact-info-card';
import { CustomerPerformanceCard } from '../customer-details-cards/customer-performance-card';
import { CustomerStatusSwitchCard } from '../customer-details-cards/customer-status-switch-card';
import { CustomerOrdersTable } from '../customer-orders-table/customer-orders-table';

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
