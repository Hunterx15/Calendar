import { memo } from 'react';
import { motion } from 'framer-motion';
import { CalendarDate } from '@/types/calendar.types';
import { isSameDay, isDateInRange, formatDateKey } from '@/utils/dateHelpers';
import { DateRange } from '@/types/calendar.types';
import { cn } from '@/lib/utils';

interface DateCellProps {
  calendarDate: CalendarDate;
  range: DateRange;
  hasNote: boolean;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

const DateCell = memo(function DateCell({
  calendarDate,
  range,
  hasNote,
  onClick,
  onHover,
}: DateCellProps) {
  const { date, day, isCurrentMonth, isToday, isWeekend } = calendarDate;
  const { start, end } = range;

  const isStart = start && isSameDay(date, start);
  const isEnd = end && isSameDay(date, end);
  const isInRange = isDateInRange(date, start, end) && !isStart && !isEnd;
  const isSingleSelect = isStart && isEnd;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      onMouseLeave={() => onHover(null)}
      aria-label={`${day} ${formatDateKey(date)}`}
      aria-selected={isStart || isEnd || undefined}
      className={cn(
        'relative flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full text-sm lg:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        // Base states
        !isCurrentMonth && 'text-calendar-outside opacity-40',
        isCurrentMonth && 'text-foreground',
        isWeekend && isCurrentMonth && 'text-calendar-weekend',
        // Today
        isToday && !isStart && !isEnd && 'ring-2 ring-calendar-today text-calendar-today font-bold',
        // Range
        isInRange && 'bg-calendar-range text-calendar-range-foreground rounded-none',
        // Start / End
        (isStart || isEnd) && !isSingleSelect && 'bg-primary text-primary-foreground font-bold',
        isStart && !isSingleSelect && 'rounded-r-none',
        isEnd && !isSingleSelect && 'rounded-l-none',
        // Single select (same day)
        isSingleSelect && 'bg-primary text-primary-foreground font-bold',
        // Hover
        !isStart && !isEnd && !isInRange && isCurrentMonth && 'hover:bg-muted',
      )}
    >
      {day}
      {hasNote && (
        <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
      )}
    </motion.button>
  );
});

export default DateCell;
