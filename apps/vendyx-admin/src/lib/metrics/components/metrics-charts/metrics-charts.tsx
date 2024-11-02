import { type FC } from 'react';

import { type MetricRange } from '@/api/scalars';
import { type CommonTotalSalesMetricsFragment } from '@/api/types';
import { Tabs, TabsContent } from '@/lib/shared/components';

import { TotalSalesCard } from '../total-sales';
import { MetricsChartsDateRange } from './metrics-charts-date-range';

export const MetricsCharts: FC<Props> = ({ range, totalSales }) => {
  return (
    <Tabs defaultValue="sales" className="flex flex-col gap-4">
      <MetricsChartsDateRange defaults={range} />
      <TabsContent value="sales">
        <TotalSalesCard range={range} totalSales={totalSales} />
      </TabsContent>
    </Tabs>
  );
};

type Props = {
  range: MetricRange;
  totalSales: CommonTotalSalesMetricsFragment;
};
