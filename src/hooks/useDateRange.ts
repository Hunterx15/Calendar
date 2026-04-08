import { useState, useCallback } from 'react';
import { DateRange, SelectionPhase } from '@/types/calendar.types';

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [phase, setPhase] = useState<SelectionPhase>('idle');
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDateClick = useCallback((date: Date) => {
    switch (phase) {
      case 'idle':
        setRange({ start: date, end: null });
        setPhase('start-selected');
        break;
      case 'start-selected': {
        const start = range.start!;
        // Normalize: ensure start <= end
        if (date.getTime() < start.getTime()) {
          setRange({ start: date, end: start });
        } else {
          setRange({ start, end: date });
        }
        setPhase('complete');
        break;
      }
      case 'complete':
        setRange({ start: null, end: null });
        setPhase('idle');
        setHoveredDate(null);
        break;
    }
  }, [phase, range.start]);

  const handleDateHover = useCallback((date: Date | null) => {
    if (phase === 'start-selected') {
      setHoveredDate(date);
    }
  }, [phase]);

  // For preview range while hovering
  const previewRange: DateRange = phase === 'start-selected' && hoveredDate
    ? {
        start: range.start!.getTime() <= hoveredDate.getTime() ? range.start : hoveredDate,
        end: range.start!.getTime() <= hoveredDate.getTime() ? hoveredDate : range.start,
      }
    : range;

  return { range: previewRange, phase, handleDateClick, handleDateHover };
}
