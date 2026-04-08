import { useState, useMemo, useCallback } from 'react';
import { CalendarDate, WeekStartDay } from '@/types/calendar.types';
import { getCalendarGrid, getDayLabels, MONTH_NAMES } from '@/utils/dateHelpers';

export function useCalendar(weekStart: WeekStartDay = 1) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const grid: CalendarDate[] = useMemo(
    () => getCalendarGrid(year, month, weekStart),
    [year, month, weekStart]
  );

  const dayLabels = useMemo(() => getDayLabels(weekStart), [weekStart]);
  const monthName = MONTH_NAMES[month];

  const goToPrevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const goToNextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  return { year, month, grid, dayLabels, monthName, goToPrevMonth, goToNextMonth, goToToday };
}
