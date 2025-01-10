import { type FC } from 'react';

import { type MetricRange } from '@/api/scalars/scalars.type';
import { type CommonMetricsResultFragment } from '@/api/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { formatDateForMetricCard } from '@/shared/utils/dates';

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
