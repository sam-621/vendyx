import { type FC } from 'react';

import { type MetricRange } from '@/api/scalars';
import { type CommonMetricsResultFragment } from '@/api/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/shared/components';

import { TotalOrdersCard } from '../total-orders';
import { TotalSalesCard } from '../total-sales';
import { MetricsChartsDateRange } from './metrics-charts-date-range';

export const MetricsCharts: FC<Props> = ({ range, totalSales, totalOrders }) => {
  return (
    <Tabs defaultValue="sales" className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <TabsList className="w-fit">
            <TabsTrigger value="sales">Total sales</TabsTrigger>
            <TabsTrigger value="orders">Total orders</TabsTrigger>
            {/* <TabsTrigger value="customers">New customers</TabsTrigger> */}
          </TabsList>
        </div>
        <MetricsChartsDateRange defaults={range} />
      </div>
      <TabsContent value="sales">
        <TotalSalesCard range={range} totalSales={totalSales} />
      </TabsContent>
      <TabsContent value="orders">
        <TotalOrdersCard range={range} totalOrders={totalOrders} />
      </TabsContent>
    </Tabs>
  );
};

type Props = {
  range: MetricRange;
  totalSales: CommonMetricsResultFragment;
  totalOrders: CommonMetricsResultFragment;
};
