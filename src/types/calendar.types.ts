export interface CalendarDate {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type SelectionPhase = 'idle' | 'start-selected' | 'complete';

export interface CalendarNote {
  id: string;
  dateKey: string; // YYYY-MM-DD
  text: string;
  createdAt: string;
}

export type WeekStartDay = 0 | 1; // 0 = Sunday, 1 = Monday

export interface CalendarConfig {
  weekStartDay: WeekStartDay;
}
