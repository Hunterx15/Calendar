import { motion, AnimatePresence } from 'framer-motion';
import DateCell from './DateCell';
import { CalendarDate, DateRange, CalendarNote } from '@/types/calendar.types';
import { formatDateKey } from '@/utils/dateHelpers';

interface CalendarGridProps {
  year: number;
  monthName: string;
  dayLabels: string[];
  grid: CalendarDate[];
  range: DateRange;
  notes: CalendarNote[];
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  onToday: () => void;
}

export default function CalendarGrid({
  year,
  monthName,
  dayLabels,
  grid,
  range,
  notes,
  onDateClick,
  onDateHover,
  onToday,
}: CalendarGridProps) {
  const noteKeys = new Set(notes.map((n) => n.dateKey));

  return (
    <div className="flex h-full flex-col">
      {/* Today button */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onToday}
          className="rounded-full border border-border px-4 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Today
        </button>
      </div>

      {/* Day labels row */}
      <div className="grid grid-cols-7">
        {dayLabels.map((label, i) => {
          const isWeekend = i >= 5; // Sat, Sun for Mon-start
          return (
            <div
              key={label}
              className={`flex h-10 items-center justify-center border-b border-border text-xs font-bold uppercase tracking-widest ${
                isWeekend ? 'text-calendar-weekend' : 'text-muted-foreground'
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Date grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${monthName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid flex-1 grid-cols-7"
        >
          {grid.map((cd, idx) => {
            const row = Math.floor(idx / 7);
            const isLastRow = row === Math.floor((grid.length - 1) / 7);
            return (
              <div
                key={formatDateKey(cd.date)}
                className={`flex items-center justify-center border-b ${
                  isLastRow ? 'border-transparent' : 'border-border'
                }`}
                style={{ minHeight: '48px' }}
              >
                <DateCell
                  calendarDate={cd}
                  range={range}
                  hasNote={noteKeys.has(formatDateKey(cd.date))}
                  onClick={onDateClick}
                  onHover={onDateHover}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
