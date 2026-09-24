import React, { useState, useEffect } from 'react';
import { DayOfWeek, TimetableCell, TimeSlot } from '../types/timetable';
import { TEACHERS, DAYS_OF_WEEK } from '../data/defaultTimetable';
import { Clock, PlayCircle, BookOpen, User, Bell, ArrowRight } from 'lucide-react';

interface LivePeriodTrackerProps {
  schedule: TimetableCell[];
  timeSlots: TimeSlot[];
}

export const LivePeriodTracker: React.FC<LivePeriodTrackerProps> = ({ schedule, timeSlots }) => {
  const [currentDay, setCurrentDay] = useState<DayOfWeek>('સોમવાર');
  const [simulatedTime, setSimulatedTime] = useState<string>('11:20');
  const [isUsingRealTime, setIsUsingRealTime] = useState(true);

  // Sync with real time on mount
  useEffect(() => {
    const update = () => {
      if (!isUsingRealTime) return;
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setSimulatedTime(`${hours}:${minutes}`);

      // Map day 1-6 (Mon-Sat)
      const dayIndex = now.getDay(); // 0 is Sun, 1 is Mon
      const dayMap: Record<number, DayOfWeek> = {
        1: 'સોમવાર',
        2: 'મંગળવાર',
        3: 'બુધવાર',
        4: 'ગુરુવાર',
        5: 'શુક્રવાર',
        6: 'શનિવાર',
      };
      if (dayMap[dayIndex]) {
        setCurrentDay(dayMap[dayIndex]);
      } else {
        setCurrentDay('સોમવાર'); // Default if Sunday
      }
    };

    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [isUsingRealTime]);

  // Convert time "HH:MM" to minutes from midnight
  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const currentMinutes = toMinutes(simulatedTime);

  // Find active slot
  const currentSlot = timeSlots.find((slot) => {
    const start = toMinutes(slot.startTime);
    const end = toMinutes(slot.endTime);
    return currentMinutes >= start && currentMinutes < end;
  });

  // Find next slot
  const nextSlot = timeSlots.find((slot) => {
    const start = toMinutes(slot.startTime);
    return start > currentMinutes;
  });

  const getCell = (std: string, periodNumber: number) => {
    return schedule.find(
      (c) => c.day === currentDay && c.standard === std && c.periodNumber === periodNumber
    );
  };

  const getTeacher = (teacherId: string) => TEACHERS.find((t) => t.id === teacherId);

  // Calculate progress in current slot
  let progressPercent = 0;
  let remainingMinutes = 0;
  if (currentSlot) {
    const start = toMinutes(currentSlot.startTime);
    const end = toMinutes(currentSlot.endTime);
    const total = end - start;
    const elapsed = currentMinutes - start;
    progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
    remainingMinutes = Math.max(0, end - currentMinutes);
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Clock & Day Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-base font-bold text-slate-900">લાઈવ તાસ મોનિટર</h2>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
              સમય: {simulatedTime}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            હાલના વાસ્તવિક સમય મુજબ વર્ગખંડમાં ચાલતા વિષયો અને શિક્ષકોની સ્થિતિ
          </p>
        </div>

        {/* Day selection & time simulation toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {DAYS_OF_WEEK.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setCurrentDay(d);
                  setIsUsingRealTime(false);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  currentDay === d
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {d.substring(0, 3)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="time"
              value={simulatedTime}
              onChange={(e) => {
                setSimulatedTime(e.target.value);
                setIsUsingRealTime(false);
              }}
              className="bg-transparent font-mono text-xs font-semibold text-slate-800 focus:outline-hidden"
              title="સમય બદલીને તપાસો"
            />
            {!isUsingRealTime && (
              <button
                onClick={() => setIsUsingRealTime(true)}
                className="text-indigo-600 hover:underline text-[11px] font-medium"
              >
                વાસ્તવિક સમય
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Period Status Bar */}
      {currentSlot ? (
        <div className="p-4 rounded-xl bg-slate-900 text-white shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-sm">
                હાલમાં ચાલુ: {currentSlot.name}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                ({currentSlot.startTime} થી {currentSlot.endTime})
              </span>
            </div>
            <span className="text-xs text-emerald-300 font-medium">
              બાકી સમય: {remainingMinutes} મિનિટ
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-500" />
            <span>હાલમાં શાળા સમય નથી અથવા શાળા છૂટી ગઈ છે.</span>
          </div>
          {nextSlot && (
            <span className="font-medium text-slate-900">
              આગામી: {nextSlot.name} ({nextSlot.startTime})
            </span>
          )}
        </div>
      )}

      {/* 3 Classes Live Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {(['ધોરણ ૬', 'ધોરણ ૭', 'ધોરણ ૮'] as const).map((std) => {
          const activeCell =
            currentSlot && !currentSlot.isBreak
              ? getCell(std, currentSlot.periodNumber)
              : null;
          const activeTeacher = activeCell ? getTeacher(activeCell.teacherId) : null;

          const nextCell =
            nextSlot && !nextSlot.isBreak
              ? getCell(std, nextSlot.periodNumber)
              : null;
          const nextTeacher = nextCell ? getTeacher(nextCell.teacherId) : null;

          return (
            <div
              key={std}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{std}</span>
                <span className="text-[11px] font-medium text-slate-500">વર્ગખંડ</span>
              </div>

              <div className="p-5 space-y-4">
                {currentSlot?.isBreak ? (
                  <div className="py-6 text-center text-amber-700 font-medium text-sm">
                    🔔 {currentSlot.name}
                  </div>
                ) : activeCell ? (
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      ચાલુ તાસ
                    </span>
                    <div className="text-xl font-bold text-slate-900 mt-1">
                      {activeCell.subject}
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          activeTeacher?.id === 'dipika'
                            ? 'bg-emerald-600'
                            : activeTeacher?.id === 'jayendra'
                            ? 'bg-blue-600'
                            : 'bg-amber-600'
                        }`}
                      >
                        {activeTeacher?.name.charAt(0) || 'શ'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          {activeTeacher?.name || 'શિક્ષક'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {activeTeacher?.designation}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center text-slate-400 text-xs italic">
                    કોઈ સક્રિય તાસ નથી
                  </div>
                )}

                {/* Upcoming period preview */}
                {nextCell && (
                  <div className="border-t border-slate-100 pt-3 text-xs flex items-center justify-between text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>આગામી:</span>
                      <strong className="text-slate-800">{nextCell.subject}</strong>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      ({nextTeacher?.name.split(' ')[0]})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
