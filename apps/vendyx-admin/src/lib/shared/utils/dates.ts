import * as fns from 'date-fns';

/**
 * Formats date for calendar input
 */
export const formatDateForCalendar = (date: Date) => fns.format(date, 'LLL dd, y');

/**
 * Formats date for metric card in /dashboard
 */
export const formatDateForMetricCard = (date: Date) => fns.format(date, 'dd MMM yyyy');

/**
 * returns how many days have the current month in the given date
 */
export const getDaysInMonth = (date: Date) => fns.getDaysInMonth(date);
