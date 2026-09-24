import React, { useState } from 'react';
import { TeacherId, TimetableCell, TimeSlot } from '../types/timetable';
import { TEACHERS, DAYS_OF_WEEK } from '../data/defaultTimetable';
import { User, CheckCircle2, Coffee, Clock, BookOpen, Calendar } from 'lucide-react';

interface TeacherTimetableProps {
  schedule: TimetableCell[];
  timeSlots: TimeSlot[];
  onEditCell: (cell: TimetableCell) => void;
}

export const TeacherTimetable: React.FC<TeacherTimetableProps> = ({
  schedule,
  timeSlots,
  onEditCell,
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<TeacherId>('dipika');

  const selectedTeacher = TEACHERS.find((t) => t.id === selectedTeacherId) || TEACHERS[0];

  const teacherSchedule = schedule.filter((c) => c.teacherId === selectedTeacherId);

  // Group by standard to see distribution
  const stdCount = {
    'ધોરણ ૬': teacherSchedule.filter((c) => c.standard === 'ધોરણ ૬').length,
    'ધોરણ ૭': teacherSchedule.filter((c) => c.standard === 'ધોરણ ૭').length,
    'ધોરણ ૮': teacherSchedule.filter((c) => c.standard === 'ધોરણ ૮').length,
  };

  const totalPeriods = teacherSchedule.length;

  const getSlotForTeacher = (day: string, periodNumber: number) => {
    return teacherSchedule.find((c) => c.day === day && c.periodNumber === periodNumber);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Selection header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            શિક્ષકવાર કાર્યભાર અને સાપ્તાહિક સમયપત્રક
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            દરેક શિક્ષકના ધોરણ ૬, ૭ અને ૮ ના તાસનું વિગતવાર પૃથક્કરણ
          </p>
        </div>

        {/* Teacher switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {TEACHERS.map((teacher) => (
            <button
              key={teacher.id}
              onClick={() => setSelectedTeacherId(teacher.id)}
              className={`px-3 py-2 text-xs font-bold rounded-md transition-colors flex items-center gap-1.5 ${
                selectedTeacherId === teacher.id
                  ? teacher.id === 'dipika'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : teacher.id === 'jayendra'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{teacher.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Profile & Workload Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Info card */}
        <div className="md:col-span-1 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white shadow-xs ${
                selectedTeacher.id === 'dipika'
                  ? 'bg-emerald-600'
                  : selectedTeacher.id === 'jayendra'
                  ? 'bg-blue-600'
                  : 'bg-amber-600'
              }`}
            >
              {selectedTeacher.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{selectedTeacher.name}</h3>
              <p className="text-xs text-slate-500">{selectedTeacher.designation}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              ફાળવેલ મુખ્ય વિષયો
            </span>
            <div className="flex flex-wrap gap-1">
              {selectedTeacher.assignedSubjects.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-slate-100 text-slate-700 text-xs font-medium rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">કુલ સાપ્તાહિક તાસ:</span>
              <span className="font-bold text-slate-900 tabular-nums">{totalPeriods} તાસ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">ધોરણ ૬ માં:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{stdCount['ધોરણ ૬']} તાસ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">ધોરણ ૭ માં:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{stdCount['ધોરણ ૭']} તાસ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">ધોરણ ૮ માં:</span>
              <span className="font-semibold text-slate-800 tabular-nums">{stdCount['ધોરણ ૮']} તાસ</span>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wide">
              {selectedTeacher.name} નું દૈનિક સમયપત્રક
            </h3>
            <span className="text-xs text-slate-300">કોઈપણ તાસમાં ઓવરલેપ નથી</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  <th className="py-2.5 px-3 w-28 border-r border-slate-200">તાસ & સમય</th>
                  {DAYS_OF_WEEK.map((day) => (
                    <th key={day} className="py-2.5 px-2.5 text-center border-r border-slate-200 last:border-r-0">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {timeSlots.map((slot) => {
                  if (slot.isBreak) {
                    return (
                      <tr key={slot.periodNumber} className="bg-slate-100/60 text-slate-600">
                        <td className="py-1.5 px-3 font-mono border-r border-slate-200 text-[10px] tabular-nums">
                          {slot.startTime} - {slot.endTime}
                        </td>
                        <td colSpan={6} className="py-1.5 px-3 text-center text-[11px] font-medium text-slate-500">
                          ☕ {slot.name}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={slot.periodNumber} className="hover:bg-slate-50/40">
                      <td className="py-2 px-3 border-r border-slate-200 bg-slate-50/30 font-medium">
                        <div className="font-bold text-slate-800 text-[11px]">{slot.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono tabular-nums">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>

                      {DAYS_OF_WEEK.map((day) => {
                        const cell = getSlotForTeacher(day, slot.periodNumber);

                        if (!cell) {
                          return (
                            <td
                              key={day}
                              className="py-2 px-2 text-center border-r border-slate-200 last:border-r-0 bg-slate-50/20 text-slate-400 italic text-[11px]"
                            >
                              મુક્ત તાસ
                            </td>
                          );
                        }

                        // Determine standard color badge
                        const stdBg =
                          cell.standard === 'ધોરણ ૬'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : cell.standard === 'ધોરણ ૭'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : 'bg-purple-50 text-purple-800 border-purple-200';

                        return (
                          <td
                            key={day}
                            className="py-1.5 px-2 border-r border-slate-200 last:border-r-0 cursor-pointer hover:bg-slate-100/60 transition-colors"
                            onClick={() => onEditCell(cell)}
                          >
                            <div className="font-bold text-slate-900 text-[11px] truncate">
                              {cell.subject}
                            </div>
                            <div className="mt-0.5">
                              <span
                                className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold border ${stdBg}`}
                              >
                                {cell.standard}
                              </span>
                            </div>
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
    </div>
  );
};
