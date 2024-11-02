'use client';

import { type FC } from 'react';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { type CommonMetricsResultFragment } from '@/api/types';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/lib/shared/components';

const chartConfig = {
  value: {
    label: 'total',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export const TotalOrdersChart: FC<Props> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <AreaChart
        accessibilityLayer
        data={data.metrics}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="key"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval="preserveStartEnd"
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="value"
          type="natural"
          fill="var(--color-value)"
          fillOpacity={0.4}
          stroke="var(--color-value)"
        />
      </AreaChart>
    </ChartContainer>
  );
};

type Props = {
  data: CommonMetricsResultFragment;
};
