import { type MetricRange } from '@/api/scalars';

export const getDefaultDateRange = (): MetricRange => {
  const today = new Date();
  const year = today.getFullYear();

  return {
    startsAt: new Date(year, 0, 1),
    endsAt: new Date(year, 11, 31)
  };
};
