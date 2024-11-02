import { type FC } from 'react';

import { format } from 'date-fns';

import { type MetricRange } from '@/api/scalars';
import { type CommonTotalSalesMetricsFragment } from '@/api/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components';
import { formatPrice } from '@/lib/shared/utils';

import { TotalSalesChart } from './total-sales-chart';

export const TotalSalesCard: FC<Props> = ({ range, totalSales }) => {
  return (
    <Card>
      <CardHeader className="pl-8">
        <CardTitle>{formatPrice(totalSales.totalSales, { withCurrencyIcon: true })}</CardTitle>
        <CardDescription>
          {!range.startsAt || !range.endsAt
            ? '--- - ---'
            : `${format(range.startsAt, 'dd MMM yyyy')} - ${format(range.endsAt, 'dd MMM yyyy')}`}
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
  totalSales: CommonTotalSalesMetricsFragment;
};
