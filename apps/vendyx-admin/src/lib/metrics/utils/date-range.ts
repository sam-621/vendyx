import { getDaysInMonth } from 'date-fns';

import { type MetricRange } from '@/api/scalars';

/**
 * Returns the default date range for metrics in dashboard
 * Always returns date range between the 1st day and the last day of the month
 */
export const getDefaultDateRange = (): MetricRange => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(today);

  return {
    startsAt: new Date(year, month, 1),
    endsAt: new Date(year, month, daysInMonth)
  };
};
