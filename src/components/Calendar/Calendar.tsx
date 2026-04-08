import { useState, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useDateRange } from '@/hooks/useDateRange';
import { useNotes } from '@/hooks/useNotes';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import RangeSelector from './RangeSelector';
import NotesPanel from './NotesPanel';

export default function Calendar() {
  const { year, month, grid, dayLabels, monthName, goToPrevMonth, goToNextMonth, goToToday } =
    useCalendar(1);
  const { range, phase, handleDateClick, handleDateHover } = useDateRange();
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onDateClick = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      handleDateClick(date);
    },
    [handleDateClick]
  );

  const yearMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
  const monthNotes = notes.filter((n) => n.dateKey.startsWith(yearMonth));

  return (
    <div className="flex h-screen w-full flex-col bg-card">
      {/* Top: Hero image with diagonal overlay */}
      <div className="relative w-full" style={{ flex: '0 0 45%' }}>
        <HeroSection
          monthName={monthName}
          year={year}
          month={month}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />
      </div>

      {/* Bottom: Notes + Calendar grid */}
      <div className="flex flex-1 flex-col overflow-auto sm:flex-row">
        

        {/* Calendar grid (right side) */}
        <div className="flex-1 p-4 lg:p-6">
          <CalendarGrid
            year={year}
            monthName={monthName}
            dayLabels={dayLabels}
            grid={grid}
            range={range}
            notes={monthNotes}
            onDateClick={onDateClick}
            onDateHover={handleDateHover}
            onToday={goToToday}
          />
        </div>

        {/* Notes section (left side) */}
        <div className="w-full border-b border-border p-4 sm:w-64 sm:border-b-0 sm:border-r md:w-72 lg:w-80 lg:p-6 lg:pt-16">
          <RangeSelector range={range} phase={phase} />
          <div className="mt-4">
            <NotesPanel
              selectedDate={selectedDate}
              notes={notes}
              onAdd={addNote}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
