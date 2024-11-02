import { type FC } from 'react';
import { type DateRange } from 'react-day-picker';

import { format } from 'date-fns';

import { type CommonTotalSalesMetricsFragment } from '@/api/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/shared/components';
import { formatPrice } from '@/lib/shared/utils';

import { TotalSalesChart } from './total-sales-chart';

export const TotalSalesCard: FC<Props> = ({ date, totalSales }) => {
  return (
    <Card>
      <CardHeader className="pl-8">
        <CardTitle>{formatPrice(totalSales.totalSales, { withCurrencyIcon: true })}</CardTitle>
        <CardDescription>
          {!date.from || !date.to
            ? '--- - ---'
            : `${format(date?.from, 'dd MMM yyyy')} - ${format(date?.to, 'dd MMM yyyy')}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TotalSalesChart data={totalSales} />
      </CardContent>
    </Card>
  );
};

type Props = {
  date: DateRange;
  totalSales: CommonTotalSalesMetricsFragment;
};
