'use client';

import { type FC, useState } from 'react';
import { type DateRange } from 'react-day-picker';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { type MetricRange } from '@/api/scalars';
import { type CommonTotalSalesMetricsFragment } from '@/api/types';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/lib/shared/components';
import { cn } from '@/lib/shared/utils';

import { TotalSalesCard } from '../total-sales';

export const MetricsCharts: FC<Props> = ({ defaults, totalSales }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [date, setDate] = useState<DateRange>({
    from: defaults.startsAt,
    to: defaults.endsAt
  });

  return (
    <Tabs defaultValue="sales" className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <TabsList className="w-fit">
            <TabsTrigger value="sales">Total sales</TabsTrigger>
            <TabsTrigger value="orders">Total orders</TabsTrigger>
            <TabsTrigger value="customers">New customers</TabsTrigger>
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
                onSelect={(range: DateRange | undefined) => {
                  const params = new URLSearchParams(searchParams);

                  if (!range?.from || !range.to) {
                    params.delete('startsAt');
                    params.delete('endsAt');

                    replace(`${pathname}?${params.toString()}`, { scroll: false });
                    setDate({ from: range?.from, to: range?.to });
                    return;
                  }

                  params.set('startsAt', range?.from.toISOString());
                  params.set('endsAt', range?.to.toISOString());

                  replace(`${pathname}?${params.toString()}`, { scroll: false });
                  setDate({ from: range.from, to: range.to });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <TabsContent value="sales">
        <TotalSalesCard date={date} totalSales={totalSales} />
      </TabsContent>
    </Tabs>
  );
};

type Props = {
  defaults: MetricRange;
  totalSales: CommonTotalSalesMetricsFragment;
};
