import { useState, useCallback, useEffect } from 'react';
import { CalendarNote } from '@/types/calendar.types';

const STORAGE_KEY = 'calendar-notes';

function loadNotes(): CalendarNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: CalendarNote[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useNotes() {
  const [notes, setNotes] = useState<CalendarNote[]>(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = useCallback((dateKey: string, text: string) => {
    const note: CalendarNote = {
      id: crypto.randomUUID(),
      dateKey,
      text,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, note]);
  }, []);

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNotesForDate = useCallback(
    (dateKey: string) => notes.filter((n) => n.dateKey === dateKey),
    [notes]
  );

  const getNotesForMonth = useCallback(
    (yearMonth: string) => notes.filter((n) => n.dateKey.startsWith(yearMonth)),
    [notes]
  );

  return { notes, addNote, updateNote, deleteNote, getNotesForDate, getNotesForMonth };
}
