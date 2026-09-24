import React, { useState } from 'react';
import { SchoolConfig, TimetableCell, TimeSlot } from '../types/timetable';
import { DAYS_OF_WEEK, STANDARDS, TEACHERS } from '../data/defaultTimetable';
import { Printer, X, Download, FileText } from 'lucide-react';

interface PrintViewProps {
  isOpen: boolean;
  onClose: () => void;
  config: SchoolConfig;
  schedule: TimetableCell[];
  timeSlots: TimeSlot[];
}

export const PrintView: React.FC<PrintViewProps> = ({
  isOpen,
  onClose,
  config,
  schedule,
  timeSlots,
}) => {
  if (!isOpen) return null;

  const [printMode, setPrintMode] = useState<'master' | 'class6' | 'class7' | 'class8'>('master');

  const handlePrint = () => {
    window.print();
  };

  const getCell = (day: string, periodNumber: number, std: string) => {
    return schedule.find(
      (c) => c.day === day && c.periodNumber === periodNumber && c.standard === std
    );
  };

  const getTeacher = (teacherId: string) => TEACHERS.find((t) => t.id === teacherId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Controls (Hidden in actual print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-3">
            <Printer className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-sm">પ્રિન્ટ / PDF ડાઉનલોડ પ્રિવ્યૂ</h3>
              <p className="text-xs text-slate-400">
                A4 સાઈઝમાં સરકારી પ્રાથમિક શાળાના નિર્ધારિત ફોર્મેટ મુજબ પ્રિન્ટ થશે
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View filter */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
              <button
                onClick={() => setPrintMode('master')}
                className={`px-3 py-1 rounded font-medium ${
                  printMode === 'master' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                }`}
              >
                સંયુક્ત માસ્ટર
              </button>
              <button
                onClick={() => setPrintMode('class6')}
                className={`px-2.5 py-1 rounded font-medium ${
                  printMode === 'class6' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                }`}
              >
                ધોરણ ૬
              </button>
              <button
                onClick={() => setPrintMode('class7')}
                className={`px-2.5 py-1 rounded font-medium ${
                  printMode === 'class7' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                }`}
              >
                ધોરણ ૭
              </button>
              <button
                onClick={() => setPrintMode('class8')}
                className={`px-2.5 py-1 rounded font-medium ${
                  printMode === 'class8' ? 'bg-indigo-600 text-white' : 'text-slate-300'
                }`}
              >
                ધોરણ ૮
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>પ્રિન્ટ કરો (Ctrl+P)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div className="overflow-y-auto p-6 sm:p-8 bg-slate-100 flex-1">
          <div className="bg-white p-8 max-w-5xl mx-auto rounded-lg shadow-sm border border-slate-300 text-slate-900 text-xs">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-600 tracking-wider">
                ગુજરાત પ્રાથમિક શિક્ષણ વિભાગ
              </span>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {config.schoolName}
              </h1>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-600 font-medium">
                <span>તાલુકો: {config.subDistrict}</span>
                <span>·</span>
                <span>જિલ્લો: {config.district}</span>
                <span>·</span>
                <span>શૈક્ષણિક વર્ષ: {config.academicYear}</span>
              </div>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-100 text-slate-900 font-bold text-xs rounded border border-slate-300">
                {printMode === 'master'
                  ? 'ઉચ્ચ પ્રાથમિક વિભાગ (ધોરણ ૬ થી ૮) સંયુક્ત સાપ્તાહિક સમયપત્રક'
                  : printMode === 'class6'
                  ? 'ધોરણ - ૬ સાપ્તાહિક વર્ગખંડ સમયપત્રક'
                  : printMode === 'class7'
                  ? 'ધોરણ - ૭ સાપ્તાહિક વર્ગખંડ સમયપત્રક'
                  : 'ધોરણ - ૮ સાપ્તાહિક વર્ગખંડ સમયપત્રક'}
              </div>
            </div>

            {/* If Single Class View */}
            {printMode !== 'master' ? (
              <div className="space-y-4">
                <table className="w-full border-collapse border border-slate-400 text-center text-xs">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-400 py-2 px-2 w-28">તાસ & સમય</th>
                      {DAYS_OF_WEEK.map((d) => (
                        <th key={d} className="border border-slate-400 py-2 px-2">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => {
                      if (slot.isBreak) {
                        return (
                          <tr key={slot.periodNumber} className="bg-slate-50 font-medium">
                            <td className="border border-slate-400 py-1.5 px-2 font-mono text-[10px]">
                              {slot.startTime} - {slot.endTime}
                            </td>
                            <td colSpan={6} className="border border-slate-400 py-1.5 px-2 text-slate-700">
                              {slot.name} ({slot.durationMinutes} મિનિટ)
                            </td>
                          </tr>
                        );
                      }

                      const targetStd =
                        printMode === 'class6'
                          ? 'ધોરણ ૬'
                          : printMode === 'class7'
                          ? 'ધોરણ ૭'
                          : 'ધોરણ ૮';

                      return (
                        <tr key={slot.periodNumber}>
                          <td className="border border-slate-400 py-2 px-2 font-mono text-[11px] bg-slate-50/50">
                            <strong className="block text-slate-900">{slot.name}</strong>
                            <span className="text-[10px] text-slate-600">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </td>
                          {DAYS_OF_WEEK.map((d) => {
                            const c = getCell(d, slot.periodNumber, targetStd);
                            const t = c ? getTeacher(c.teacherId) : null;
                            return (
                              <td key={d} className="border border-slate-400 py-2 px-1.5">
                                <div className="font-bold text-slate-900">{c?.subject || '-'}</div>
                                <div className="text-[10px] text-slate-600 mt-0.5">
                                  ({t?.name || c?.customTeacherName || 'શિક્ષક'})
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
            ) : (
              /* Master Table per day */
              <div className="space-y-6">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="break-inside-avoid">
                    <div className="font-bold text-xs bg-slate-200 px-3 py-1.5 border border-slate-400 border-b-0 flex justify-between">
                      <span>{day} નો સમયપત્રક</span>
                      <span>ધોરણ ૬, ૭, ૮</span>
                    </div>
                    <table className="w-full border-collapse border border-slate-400 text-center text-xs">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-400 py-1.5 px-2 w-32">તાસ & સમય</th>
                          <th className="border border-slate-400 py-1.5 px-2 w-1/3">ધોરણ ૬</th>
                          <th className="border border-slate-400 py-1.5 px-2 w-1/3">ધોરણ ૭</th>
                          <th className="border border-slate-400 py-1.5 px-2 w-1/3">ધોરણ ૮</th>
                        </tr>
                      </thead>
                      <tbody>
                        {timeSlots.map((slot) => {
                          if (slot.isBreak) {
                            return (
                              <tr key={slot.periodNumber} className="bg-slate-50 font-medium">
                                <td className="border border-slate-400 py-1 px-2 font-mono text-[10px]">
                                  {slot.startTime} - {slot.endTime}
                                </td>
                                <td colSpan={3} className="border border-slate-400 py-1 px-2 text-slate-700">
                                  🔔 {slot.name} ({slot.durationMinutes} મિનિટ)
                                </td>
                              </tr>
                            );
                          }

                          const c6 = getCell(day, slot.periodNumber, 'ધોરણ ૬');
                          const c7 = getCell(day, slot.periodNumber, 'ધોરણ ૭');
                          const c8 = getCell(day, slot.periodNumber, 'ધોરણ ૮');

                          const t6 = c6 ? getTeacher(c6.teacherId) : null;
                          const t7 = c7 ? getTeacher(c7.teacherId) : null;
                          const t8 = c8 ? getTeacher(c8.teacherId) : null;

                          return (
                            <tr key={slot.periodNumber}>
                              <td className="border border-slate-400 py-1.5 px-2 font-mono text-[10px]">
                                <strong>{slot.name}</strong> ({slot.startTime} - {slot.endTime})
                              </td>
                              <td className="border border-slate-400 py-1.5 px-2 text-left">
                                <span className="font-bold text-slate-900">{c6?.subject}</span>
                                <span className="text-[10px] text-slate-600 ml-1">
                                  - {t6?.name}
                                </span>
                              </td>
                              <td className="border border-slate-400 py-1.5 px-2 text-left">
                                <span className="font-bold text-slate-900">{c7?.subject}</span>
                                <span className="text-[10px] text-slate-600 ml-1">
                                  - {t7?.name}
                                </span>
                              </td>
                              <td className="border border-slate-400 py-1.5 px-2 text-left">
                                <span className="font-bold text-slate-900">{c8?.subject}</span>
                                <span className="text-[10px] text-slate-600 ml-1">
                                  - {t8?.name}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {/* Subject-Teacher Summary Table */}
            <div className="mt-6 border border-slate-400 p-3 rounded-sm">
              <div className="font-bold text-xs mb-2 text-slate-900">
                શિક્ષક કાર્યભાર અને વિષય ફાળવણી પત્રક:
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                {TEACHERS.map((teacher) => (
                  <div key={teacher.id} className="border border-slate-300 p-2">
                    <strong className="block text-slate-900">{teacher.name}</strong>
                    <div className="text-slate-600 text-[10px]">{teacher.designation}</div>
                    <div className="mt-1 text-slate-700">
                      વિષયો: {teacher.assignedSubjects.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Signatures Footer */}
            <div className="mt-12 pt-4 border-t border-slate-300 grid grid-cols-4 gap-4 text-center text-xs">
              <div className="space-y-6">
                <div className="h-10" />
                <div className="border-t border-slate-400 pt-1">
                  <strong>દીપીકાબેન</strong>
                  <div className="text-[10px] text-slate-500">ગણિત - વિજ્ઞાન શિક્ષિકા</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-10" />
                <div className="border-t border-slate-400 pt-1">
                  <strong>જયેન્દ્રસિંહ</strong>
                  <div className="text-[10px] text-slate-500">ભાષા શિક્ષક</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-10" />
                <div className="border-t border-slate-400 pt-1">
                  <strong>નરેશભાઈ</strong>
                  <div className="text-[10px] text-slate-500">સા.વિજ્ઞાન - હિન્દી શિક્ષક</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-10" />
                <div className="border-t border-slate-400 pt-1">
                  <strong>{config.principalName}</strong>
                  <div className="text-[10px] text-slate-500">સહી અને સિક્કો</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
