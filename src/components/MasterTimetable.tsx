import React, { useState } from 'react';
import { DayOfWeek, Standard, TimetableCell, TimeSlot, TeacherInfo, ClashWarning } from '../types/timetable';
import { TEACHERS, DAYS_OF_WEEK } from '../data/defaultTimetable';
import { Edit2, Sparkles, AlertCircle, Clock, BookOpen, User } from 'lucide-react';

interface MasterTimetableProps {
  schedule: TimetableCell[];
  timeSlots: TimeSlot[];
  clashes: ClashWarning[];
  onEditCell: (cell: TimetableCell) => void;
  onAutoFixClashes?: () => void;
}

export const MasterTimetable: React.FC<MasterTimetableProps> = ({
  schedule,
  timeSlots,
  clashes,
  onEditCell,
}) => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | 'all'>('સોમવાર');

  const getCellData = (day: DayOfWeek, period: number, std: Standard) => {
    return schedule.find(
      (c) => c.day === day && c.periodNumber === period && c.standard === std
    );
  };

  const getTeacher = (teacherId: string): TeacherInfo | undefined => {
    return TEACHERS.find((t) => t.id === teacherId);
  };

  const hasClash = (day: DayOfWeek, period: number, std: Standard) => {
    return clashes.some(
      (c) => c.day === day && c.periodNumber === period && c.standards.includes(std)
    );
  };

  const displayDays = selectedDay === 'all' ? DAYS_OF_WEEK : [selectedDay];

  return (
    <div className="space-y-6">
      {/* Top Banner / Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              સંયુક્ત માસ્ટર સમયપત્રક (ધોરણ ૬, ૭ અને ૮)
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              દરેક તાસ માટે ચોક્કસ સમય ફાળવણી
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            શિક્ષકોના કાર્યભાર મુજબ કોઈપણ તાસમાં ક્લેશ ન થાય તે રીતે આયોજન કરેલ છે
          </p>
        </div>

        {/* Day selection tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedDay === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            બધા દિવસો
          </button>
          {DAYS_OF_WEEK.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher color key */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
        <span className="font-semibold text-slate-700">વિષય શિક્ષક નિર્દેશિકા:</span>
        <div className="flex flex-wrap items-center gap-4">
          {TEACHERS.map((teacher) => (
            <div key={teacher.id} className="flex items-center gap-1.5">
              <span
                className={`w-3 h-3 rounded-full ${
                  teacher.id === 'dipika'
                    ? 'bg-emerald-500'
                    : teacher.id === 'jayendra'
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
              />
              <span className="font-medium text-slate-800">{teacher.name}</span>
              <span className="text-slate-500">
                ({teacher.assignedSubjects.slice(0, 2).join(', ')})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clashes Notice if any */}
      {clashes.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">સમયપત્રકમાં તાસ અથડામણ (Clash) જણાય છે:</p>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              {clashes.map((c, idx) => (
                <li key={idx}>
                  {c.day} - તાસ {c.periodNumber}: <strong>{c.teacherName}</strong> એક જ સમયે{' '}
                  {c.standards.join(' અને ')} માં ફાળવેલ છે.
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Timetable Grids per day */}
      <div className="space-y-8">
        {displayDays.map((day) => (
          <div
            key={day}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
          >
            {/* Day Header */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-base font-bold tracking-wide">{day} નો સમયપત્રક</h3>
              </div>
              <span className="text-xs text-slate-300">
                ધોરણ ૬, ૭, ૮ - સમાંતર તાસ ફાળવણી
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4 w-44 text-slate-700">તાસ & ચોક્કસ સમય</th>
                    <th className="py-3 px-4 w-1/3 border-l border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 font-bold text-sm">ધોરણ ૬</span>
                        <span className="text-xs font-normal text-slate-500">વર્ગખંડ ૬</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 w-1/3 border-l border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 font-bold text-sm">ધોરણ ૭</span>
                        <span className="text-xs font-normal text-slate-500">વર્ગખંડ ૭</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 w-1/3 border-l border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-900 font-bold text-sm">ધોરણ ૮</span>
                        <span className="text-xs font-normal text-slate-500">વર્ગખંડ ૮</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {timeSlots.map((slot) => {
                    // Check if it's a break / prayer row
                    if (slot.isBreak) {
                      return (
                        <tr
                          key={`${day}-break-${slot.periodNumber}`}
                          className="bg-amber-50/50 text-amber-900"
                        >
                          <td className="py-2.5 px-4 font-mono text-xs font-medium border-r border-amber-100">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span className="tabular-nums">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            <span className="text-[11px] text-amber-700">
                              ({slot.durationMinutes} મિનિટ)
                            </span>
                          </td>
                          <td
                            colSpan={3}
                            className="py-2.5 px-4 text-center font-medium text-xs tracking-wide"
                          >
                            🔔 {slot.name}
                          </td>
                        </tr>
                      );
                    }

                    const c6 = getCellData(day, slot.periodNumber, 'ધોરણ ૬');
                    const c7 = getCellData(day, slot.periodNumber, 'ધોરણ ૭');
                    const c8 = getCellData(day, slot.periodNumber, 'ધોરણ ૮');

                    const t6 = c6 ? getTeacher(c6.teacherId) : undefined;
                    const t7 = c7 ? getTeacher(c7.teacherId) : undefined;
                    const t8 = c8 ? getTeacher(c8.teacherId) : undefined;

                    const clash6 = hasClash(day, slot.periodNumber, 'ધોરણ ૬');
                    const clash7 = hasClash(day, slot.periodNumber, 'ધોરણ ૭');
                    const clash8 = hasClash(day, slot.periodNumber, 'ધોરણ ૮');

                    return (
                      <tr
                        key={`${day}-${slot.periodNumber}`}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        {/* Time Column */}
                        <td className="py-3 px-4 font-mono text-xs border-r border-slate-200 bg-slate-50/30">
                          <div className="font-semibold text-slate-900 text-xs">
                            {slot.name}
                          </div>
                          <div className="text-slate-600 tabular-nums flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {slot.startTime} થી {slot.endTime}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {slot.durationMinutes} મિનિટ
                          </div>
                        </td>

                        {/* Std 6 Cell */}
                        <td
                          className={`py-2.5 px-4 border-l border-slate-200 relative group cursor-pointer ${
                            clash6 ? 'bg-red-50' : ''
                          }`}
                          onClick={() => c6 && onEditCell(c6)}
                        >
                          {c6 ? (
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                  <span>{c6.subject}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
                                      t6?.id === 'dipika'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : t6?.id === 'jayendra'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    <User className="w-3 h-3" />
                                    {t6 ? t6.name : c6.customTeacherName || 'શિક્ષક'}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="તાસ બદલો"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">ખાલી તાસ</span>
                          )}
                        </td>

                        {/* Std 7 Cell */}
                        <td
                          className={`py-2.5 px-4 border-l border-slate-200 relative group cursor-pointer ${
                            clash7 ? 'bg-red-50' : ''
                          }`}
                          onClick={() => c7 && onEditCell(c7)}
                        >
                          {c7 ? (
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                  <span>{c7.subject}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
                                      t7?.id === 'dipika'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : t7?.id === 'jayendra'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    <User className="w-3 h-3" />
                                    {t7 ? t7.name : c7.customTeacherName || 'શિક્ષક'}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="તાસ બદલો"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">ખાલી તાસ</span>
                          )}
                        </td>

                        {/* Std 8 Cell */}
                        <td
                          className={`py-2.5 px-4 border-l border-slate-200 relative group cursor-pointer ${
                            clash8 ? 'bg-red-50' : ''
                          }`}
                          onClick={() => c8 && onEditCell(c8)}
                        >
                          {c8 ? (
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                  <span>{c8.subject}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-1.5">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${
                                      t8?.id === 'dipika'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : t8?.id === 'jayendra'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-amber-100 text-amber-800'
                                    }`}
                                  >
                                    <User className="w-3 h-3" />
                                    {t8 ? t8.name : c8.customTeacherName || 'શિક્ષક'}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                                title="તાસ બદલો"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">ખાલી તાસ</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
