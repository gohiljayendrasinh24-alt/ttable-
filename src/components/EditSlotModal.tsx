import React, { useState, useEffect } from 'react';
import { TimetableCell, TeacherId, Standard, DayOfWeek } from '../types/timetable';
import { TEACHERS, SUBJECTS } from '../data/defaultTimetable';
import { X, AlertTriangle, ArrowLeftRight, Check, BookOpen, User } from 'lucide-react';

interface EditSlotModalProps {
  cell: TimetableCell | null;
  allCells: TimetableCell[];
  onClose: () => void;
  onSave: (updatedCell: TimetableCell) => void;
  onSwap: (sourceCell: TimetableCell, targetCell: TimetableCell) => void;
}

export const EditSlotModal: React.FC<EditSlotModalProps> = ({
  cell,
  allCells,
  onClose,
  onSave,
  onSwap,
}) => {
  if (!cell) return null;

  const [selectedSubject, setSelectedSubject] = useState(cell.subject);
  const [selectedTeacherId, setSelectedTeacherId] = useState<TeacherId>(cell.teacherId);
  const [customSubject, setCustomSubject] = useState('');

  useEffect(() => {
    setSelectedSubject(cell.subject);
    setSelectedTeacherId(cell.teacherId);
    setCustomSubject('');
  }, [cell]);

  // When subject changes, automatically pick the default teacher for that subject
  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubject(subjectName);
    const found = SUBJECTS.find((s) => s.name === subjectName);
    if (found && found.defaultTeacherId) {
      setSelectedTeacherId(found.defaultTeacherId);
    }
  };

  // Check for conflict: Is selectedTeacherId busy in another class during same day and period?
  const conflictingCell = allCells.find(
    (c) =>
      c.day === cell.day &&
      c.periodNumber === cell.periodNumber &&
      c.standard !== cell.standard &&
      c.teacherId === selectedTeacherId &&
      selectedTeacherId !== 'none' &&
      selectedTeacherId !== 'other'
  );

  const handleSave = () => {
    const finalSubject = customSubject.trim() ? customSubject.trim() : selectedSubject;
    onSave({
      ...cell,
      subject: finalSubject,
      teacherId: selectedTeacherId,
    });
  };

  const handleDoSwap = () => {
    if (!conflictingCell) return;
    // Swap source and target
    onSwap(cell, conflictingCell);
    onClose();
  };

  const currentTeacherObj = TEACHERS.find((t) => t.id === selectedTeacherId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">તાસ સંપાદન કરો</h3>
            <p className="text-xs text-slate-300">
              {cell.day} · {cell.standard} · તાસ {cell.periodNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Subject picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              વિષય પસંદ કરો
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SUBJECTS.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => handleSubjectChange(s.name)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                    selectedSubject === s.name
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="truncate">{s.name}</div>
                  <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                    શિક્ષક: {TEACHERS.find((t) => t.id === s.defaultTeacherId)?.name || 'અન્ય'}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom subject field */}
            <div className="mt-2.5">
              <input
                type="text"
                placeholder="અન્ય કોઈ વૈકલ્પિક વિષય લખો..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Teacher picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              વિષય શિક્ષક પસંદ કરો
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEACHERS.map((teacher) => (
                <button
                  type="button"
                  key={teacher.id}
                  onClick={() => setSelectedTeacherId(teacher.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    selectedTeacherId === teacher.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-bold text-xs truncate">{teacher.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {teacher.assignedSubjects.slice(0, 2).join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conflict Alert & One-Click Swap Feature */}
          {conflictingCell && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">શિક્ષક સમય ક્લેશ ચેતવણી!</strong>
                  <span>
                    <strong>{currentTeacherObj?.name}</strong> આ જ સમયે ({cell.day} - તાસ {cell.periodNumber}){' '}
                    <strong>{conflictingCell.standard}</strong> માં {conflictingCell.subject} લઈ રહ્યા છે.
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
                <span className="text-[11px] text-amber-800">
                  ક્લેશ નિવારવા માટે બંને વર્ગો વચ્ચે તાસ સ્વેપ કરો:
                </span>
                <button
                  type="button"
                  onClick={handleDoSwap}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold text-xs transition-colors shadow-xs"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>સ્વેપ કરો (Swap)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            રદ કરો
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
          >
            સાચવો (Save)
          </button>
        </div>
      </div>
    </div>
  );
};
