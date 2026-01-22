
import { differenceInCalendarWeeks, getDay, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { DayOfWeek } from './types';

/**
 * Calculates which week (1-4) of the rotation we are in based on start date and target date.
 */
export const calculateRotationWeek = (startDate: Date, targetDate: Date): number => {
  // Use difference in calendar weeks to ensure the rotation changes on Mondays
  const diffWeeks = differenceInCalendarWeeks(targetDate, startDate, { weekStartsOn: 1 });
  // Modulo 4 for the 4-week rotation
  const weekIndex = ((diffWeeks % 4) + 4) % 4; // Ensure positive index
  return weekIndex + 1;
};

export const getDayName = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('it-IT', { weekday: 'long' });
  const name = formatter.format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const isWeekend = (date: Date): boolean => {
  const day = getDay(date);
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

export const mapDayToMenuKey = (date: Date): DayOfWeek | null => {
  const day = getDay(date);
  switch (day) {
    case 1: return 'Lunedì';
    case 2: return 'Martedì';
    case 3: return 'Mercoledì';
    case 4: return 'Giovedì';
    case 5: return 'Venerdì';
    default: return null;
  }
};
