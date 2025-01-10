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
import { formatPrice } from '@/shared/utils/formatters';

import { TotalSalesChart } from './total-sales-chart';

export const TotalSalesCard: FC<Props> = ({ range, totalSales }) => {
  return (
    <Card>
      <CardHeader className="pl-8">
        <CardTitle>{formatPrice(totalSales.total, { withCurrencyIcon: true })}</CardTitle>
        <CardDescription>
          {!range.startsAt || !range.endsAt
            ? '--- - ---'
            : `${formatDateForMetricCard(range.startsAt)} - ${formatDateForMetricCard(range.endsAt)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TotalSalesChart data={totalSales} />
      </CardContent>
    </Card>
  );
};

type Props = {
  range: MetricRange;
  totalSales: CommonMetricsResultFragment;
};
