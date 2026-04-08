import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import { CalendarNote } from '@/types/calendar.types';
import { formatDateKey } from '@/utils/dateHelpers';

interface NotesPanelProps {
  selectedDate: Date | null;
  notes: CalendarNote[];
  onAdd: (dateKey: string, text: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function NotesPanel({
  selectedDate,
  notes,
  onAdd,
  onUpdate,
  onDelete,
}: NotesPanelProps) {
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const dateKey = selectedDate ? formatDateKey(selectedDate) : null;
  const dateNotes = dateKey ? notes.filter((n) => n.dateKey === dateKey) : [];

  const handleAdd = () => {
    if (!dateKey || !newText.trim()) return;
    onAdd(dateKey, newText.trim());
    setNewText('');
    setIsAdding(false);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editText.trim()) return;
    onUpdate(editingId, editText.trim());
    setEditingId(null);
    setEditText('');
  };

  const startEdit = (note: CalendarNote) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Notes</h3>
        {selectedDate && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Add note"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>

      {!selectedDate && (
        <div className="space-y-3">
          {/* Decorative note lines like the reference */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground/40 italic">
                {i === 1 ? 'Select a date to add notes...' : '\u00A0'}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedDate && (
        <>
          <p className="mb-3 text-xs font-medium text-muted-foreground">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>

          {/* Add note input */}
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Write a note..."
                  className="w-full resize-none border-b border-input bg-transparent px-0 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary"
                  rows={2}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(); }
                    if (e.key === 'Escape') setIsAdding(false);
                  }}
                />
                <div className="mt-1 flex gap-1 justify-end">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={!newText.trim()}
                    className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes list */}
          <div className="space-y-2">
            <AnimatePresence>
              {dateNotes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group border-b border-border pb-2"
                >
                  {editingId === note.id ? (
                    <div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full resize-none border-b border-input bg-transparent px-0 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:border-primary"
                        rows={2}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSaveEdit(); }
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <div className="mt-1 flex gap-1 justify-end">
                        <button onClick={() => setEditingId(null)} className="p-1 text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                        </button>
                        <button onClick={handleSaveEdit} className="p-1 text-primary hover:text-primary/80">
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-foreground leading-relaxed">{note.text}</p>
                      <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={() => startEdit(note)} className="p-1 text-muted-foreground hover:text-foreground" aria-label="Edit note">
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button onClick={() => onDelete(note.id)} className="p-1 text-muted-foreground hover:text-destructive" aria-label="Delete note">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {dateNotes.length === 0 && !isAdding && (
              <p className="text-xs text-muted-foreground italic">No notes for this date.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
