import React, { useState } from 'react';
import { Standard, TimetableCell, TimeSlot, TeacherInfo } from '../types/timetable';
import { DAYS_OF_WEEK, STANDARDS, TEACHERS } from '../data/defaultTimetable';
import { Clock, BookOpen, User, BarChart2, Edit2 } from 'lucide-react';

interface ClassTimetableProps {
  schedule: TimetableCell[];
  timeSlots: TimeSlot[];
  onEditCell: (cell: TimetableCell) => void;
}

export const ClassTimetable: React.FC<ClassTimetableProps> = ({
  schedule,
  timeSlots,
  onEditCell,
}) => {
  const [selectedStandard, setSelectedStandard] = useState<Standard>('ધોરણ ૬');

  const getCell = (day: string, periodNumber: number) => {
    return schedule.find(
      (c) => c.standard === selectedStandard && c.day === day && c.periodNumber === periodNumber
    );
  };

  const getTeacher = (teacherId: string): TeacherInfo | undefined => {
    return TEACHERS.find((t) => t.id === teacherId);
  };

  // Calculate subject counts for this standard
  const subjectStats: Record<string, { count: number; teacher: string }> = {};
  schedule
    .filter((c) => c.standard === selectedStandard)
    .forEach((cell) => {
      const teacher = getTeacher(cell.teacherId)?.name || 'અન્ય';
      if (!subjectStats[cell.subject]) {
        subjectStats[cell.subject] = { count: 0, teacher };
      }
      subjectStats[cell.subject].count += 1;
    });

  const academicSlots = timeSlots.filter((s) => !s.isBreak);

  return (
    <div className="space-y-6">
      {/* Class Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              ધોરણવાર સાપ્તાહિક સમયપત્રક
            </h2>
            <span className="text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-semibold border border-indigo-200">
              {selectedStandard}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            વર્ગખંડના નોટિસ બોર્ડ અને વિદ્યાર્થીઓની ડાયરી માટે સંપૂર્ણ સાપ્તાહિક સમયપત્રક
          </p>
        </div>

        {/* Standard switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {STANDARDS.map((std) => (
            <button
              key={std}
              onClick={() => setSelectedStandard(std)}
              className={`px-4 py-2 text-xs font-bold rounded-md transition-colors ${
                selectedStandard === std
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {std}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Distribution & Weekly Minutes Summary */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <BarChart2 className="w-4 h-4 text-indigo-600" />
            <span>{selectedStandard} - સાપ્તાહિક વિષયવાર સમય અને તાસ ફાળવણી</span>
          </div>
          <span className="text-xs text-slate-500">કુલ ૪૮ તાસ / સપ્તાહ</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(subjectStats).map(([subj, data]) => {
            const minutes = data.count * 38; // approx 38 min avg
            return (
              <div
                key={subj}
                className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="font-bold text-xs text-slate-900 truncate" title={subj}>
                  {subj}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  શિક્ષક: {data.teacher}
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-indigo-600 tabular-nums">
                    {data.count} <span className="text-[10px] font-normal text-slate-500">તાસ</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                    ~{minutes} મિ.
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Class Weekly Grid */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-3 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold tracking-wide">
            {selectedStandard} : સોમવાર થી શનિવાર પૂર્ણ સમયપત્રક
          </h3>
          <span className="text-xs text-slate-300">પ્રાથમિક શિક્ષણ વિભાગ નિયમ મુજબ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                <th className="py-3 px-3 w-32 border-r border-slate-200">તાસ & સમય</th>
                {DAYS_OF_WEEK.map((day) => (
                  <th key={day} className="py-3 px-3 text-center border-r border-slate-200 last:border-r-0">
                    <span className="text-slate-900 font-bold">{day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {timeSlots.map((slot) => {
                if (slot.isBreak) {
                  return (
                    <tr key={slot.periodNumber} className="bg-amber-50/60 text-amber-900">
                      <td className="py-2 px-3 font-mono border-r border-amber-200 font-medium">
                        <div className="tabular-nums text-slate-700 text-[11px]">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>
                      <td colSpan={6} className="py-2 px-3 text-center font-semibold text-xs tracking-wider text-amber-800">
                        🔔 {slot.name} ({slot.durationMinutes} મિનિટ)
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={slot.periodNumber} className="hover:bg-slate-50/50">
                    {/* Time slot column */}
                    <td className="py-2.5 px-3 border-r border-slate-200 bg-slate-50/50 font-medium">
                      <div className="font-bold text-slate-900 text-xs">{slot.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono tabular-nums mt-0.5">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </td>

                    {/* Day columns */}
                    {DAYS_OF_WEEK.map((day) => {
                      const cell = getCell(day, slot.periodNumber);
                      const teacher = cell ? getTeacher(cell.teacherId) : undefined;

                      return (
                        <td
                          key={day}
                          className="py-2 px-2.5 border-r border-slate-200 last:border-r-0 relative group cursor-pointer hover:bg-indigo-50/40 transition-colors"
                          onClick={() => cell && onEditCell(cell)}
                        >
                          {cell ? (
                            <div>
                              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                                <span className="truncate">{cell.subject}</span>
                                <Edit2 className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                                    teacher?.id === 'dipika'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : teacher?.id === 'jayendra'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {teacher ? teacher.name : cell.customTeacherName || 'શિક્ષક'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
