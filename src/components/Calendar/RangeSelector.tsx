import { DateRange, SelectionPhase } from '@/types/calendar.types';
import { formatDateKey } from '@/utils/dateHelpers';

interface RangeSelectorProps {
  range: DateRange;
  phase: SelectionPhase;
}

export default function RangeSelector({ range, phase }: RangeSelectorProps) {
  const { start, end } = range;

  return (
    <div className="mb-2">
      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">Date Range</h3>
      {phase === 'idle' && (
        <p className="text-xs text-muted-foreground">Click a date to start selecting.</p>
      )}
      {phase === 'start-selected' && start && (
        <p className="text-xs text-muted-foreground">
          Start: <span className="font-medium text-foreground">{formatDateKey(start)}</span>
          <br />Click another date to set end.
        </p>
      )}
      {phase === 'complete' && start && end && (
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Start: <span className="font-medium text-foreground">{formatDateKey(start)}</span></p>
          <p>End: <span className="font-medium text-foreground">{formatDateKey(end)}</span></p>
          <p className="text-[10px] italic">Click any date to reset.</p>
        </div>
      )}
    </div>
  );
}
