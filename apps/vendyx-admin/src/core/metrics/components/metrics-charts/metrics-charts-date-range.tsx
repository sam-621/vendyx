'use client';

import { type FC } from 'react';

import { CalendarIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { type MetricRange } from '@/api/scalars/scalars.type';
import { Button } from '@/shared/components/ui/button';
import { Calendar, useDateRange } from '@/shared/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { formatDateForCalendar } from '@/shared/utils/dates';
import { cn } from '@/shared/utils/theme';

export const MetricsChartsDateRange: FC<Props> = ({ defaults }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [date, setDate] = useDateRange({
    from: defaults.startsAt,
    to: defaults.endsAt
  });

  return (
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
                  {formatDateForCalendar(date.from)} - {formatDateForCalendar(date.to)}
                </>
              ) : (
                formatDateForCalendar(date.from)
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
            onSelect={range => {
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
  );
};

type Props = {
  defaults: MetricRange;
};
