'use client';
import { useState } from 'react';
import { type DateRange } from 'react-day-picker';

import { addDays, format } from 'date-fns';
import { CalendarIcon, DotIcon, InboxIcon } from 'lucide-react';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  AdminPageLayout,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000
  }
];

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export default function Home() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20)
  });

  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="/products/new">
          <Button>Add product</Button>
        </Link>
      }
    >
      <div className="flex flex-col gap-8">
        <main>
          <Tabs defaultValue="sales" className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <TabsList className="w-fit">
                  <TabsTrigger value="sales">Total sales</TabsTrigger>
                  <TabsTrigger value="customers">New customers</TabsTrigger>
                  <TabsTrigger value="orders">Total orders</TabsTrigger>
                </TabsList>
              </div>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={'outline'}
                      className={cn(
                        'w-[260px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <TabsContent value="sales">
              <Card>
                <CardHeader className="pl-8">
                  <CardTitle>$12,879</CardTitle>
                  <CardDescription>13 June 2023 - 14 July 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                      accessibilityLayer
                      data={data}
                      margin={{
                        left: 12,
                        right: 12
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={value => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Area
                        dataKey="total"
                        type="natural"
                        fill="var(--color-total)"
                        fillOpacity={0.4}
                        stroke="var(--color-total)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <DotIcon className="text-distinct w-8 h-8" />
            <h2 className="font-semibold text-base">Pending</h2>
          </div>
          <div>
            <Button variant="secondary" className="flex gap-2">
              <InboxIcon className="w-4 h-4" />8 orders to fulfill
            </Button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
