import { type FC } from 'react';

import { type MetricRange } from '@/api/scalars';
import { type CommonMetricsResultFragment } from '@/api/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components';
import { formatDateForMetricCard } from '@/lib/shared/utils';

import { TotalOrdersChart } from './total-orders-chart';

export const TotalOrdersCard: FC<Props> = ({ range, totalOrders }) => {
  return (
    <Card>
      <CardHeader className="pl-8">
        <CardTitle>{totalOrders.total}</CardTitle>
        <CardDescription>
          {!range.startsAt || !range.endsAt
            ? '--- - ---'
            : `${formatDateForMetricCard(range.startsAt)} - ${formatDateForMetricCard(range.endsAt)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TotalOrdersChart data={totalOrders} />
      </CardContent>
    </Card>
  );
};

type Props = {
  range: MetricRange;
  totalOrders: CommonMetricsResultFragment;
};
