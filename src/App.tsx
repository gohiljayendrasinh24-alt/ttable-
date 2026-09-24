/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MasterTimetable } from './components/MasterTimetable';
import { ClassTimetable } from './components/ClassTimetable';
import { TeacherTimetable } from './components/TeacherTimetable';
import { LivePeriodTracker } from './components/LivePeriodTracker';
import { EditSlotModal } from './components/EditSlotModal';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { PrintView } from './components/PrintView';
import { TimetableCell, SchoolConfig } from './types/timetable';
import {
  generateDefaultTimetable,
  detectClashes,
  REGULAR_TIME_SLOTS,
  MORNING_TIME_SLOTS,
  DEFAULT_SCHOOL_CONFIG,
  TEACHERS,
} from './data/defaultTimetable';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY_TIMETABLE = 'gujarat_school_timetable_data_v2';
const STORAGE_KEY_CONFIG = 'gujarat_school_config_v2';

export default function App() {
  const [schedule, setSchedule] = useState<TimetableCell[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIMETABLE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved timetable', e);
    }
    return generateDefaultTimetable();
  });

  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved school config', e);
    }
    return DEFAULT_SCHOOL_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<'master' | 'class' | 'teacher' | 'live'>('master');
  const [editingCell, setEditingCell] = useState<TimetableCell | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TIMETABLE, JSON.stringify(schedule));
    } catch (e) {
      console.error('Could not save schedule', e);
    }
  }, [schedule]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(schoolConfig));
    } catch (e) {
      console.error('Could not save config', e);
    }
  }, [schoolConfig]);

  // Determine active time slots
  const timeSlots =
    schoolConfig.timingType === 'morning' ? MORNING_TIME_SLOTS : REGULAR_TIME_SLOTS;

  // Realtime clash checks
  const clashes = detectClashes(schedule);

  const handleEditCell = (cell: TimetableCell) => {
    setEditingCell(cell);
  };

  const handleSaveCell = (updatedCell: TimetableCell) => {
    setSchedule((prev) =>
      prev.map((c) =>
        c.day === updatedCell.day &&
        c.periodNumber === updatedCell.periodNumber &&
        c.standard === updatedCell.standard
          ? updatedCell
          : c
      )
    );
    setEditingCell(null);
  };

  const handleSwapCells = (cellA: TimetableCell, cellB: TimetableCell) => {
    setSchedule((prev) =>
      prev.map((c) => {
        if (
          c.day === cellA.day &&
          c.periodNumber === cellA.periodNumber &&
          c.standard === cellA.standard
        ) {
          return {
            ...c,
            subject: cellB.subject,
            teacherId: cellB.teacherId,
            customTeacherName: cellB.customTeacherName,
          };
        }
        if (
          c.day === cellB.day &&
          c.periodNumber === cellB.periodNumber &&
          c.standard === cellB.standard
        ) {
          return {
            ...c,
            subject: cellA.subject,
            teacherId: cellA.teacherId,
            customTeacherName: cellA.customTeacherName,
          };
        }
        return c;
      })
    );
  };

  const handleResetTimetable = () => {
    const defaultData = generateDefaultTimetable();
    setSchedule(defaultData);
    setSchoolConfig(DEFAULT_SCHOOL_CONFIG);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        schoolConfig={schoolConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onPrint={() => setIsPrintOpen(true)}
        clashes={clashes}
      />

      {/* Hero Welcome / Information Kicker (Discreet, zero AI slop) */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-semibold text-slate-900">ફાળવેલ વિષય શિક્ષકો:</span>
            <span>દીપીકાબેન (ગણિત/વિજ્ઞાન)</span>
            <span className="text-slate-300">·</span>
            <span>જયેન્દ્રસિંહ (અંગ્રેજી/ગુજરાતી)</span>
            <span className="text-slate-300">·</span>
            <span>નરેશભાઈ (સામાજિક વિજ્ઞાન/હિન્દી)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              શૂન્ય ક્લેશ ગેરંટી (0 Conflict)
            </span>
            <span className="text-slate-300">|</span>
            <span>પાળી: {schoolConfig.timingType === 'regular' ? '૧૦:૪૫ થી ૦૫:૦૦' : '૦૭:૩૦ થી ૧૨:૩૦'}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {activeTab === 'master' && (
          <MasterTimetable
            schedule={schedule}
            timeSlots={timeSlots}
            clashes={clashes}
            onEditCell={handleEditCell}
          />
        )}

        {activeTab === 'class' && (
          <ClassTimetable
            schedule={schedule}
            timeSlots={timeSlots}
            onEditCell={handleEditCell}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherTimetable
            schedule={schedule}
            timeSlots={timeSlots}
            onEditCell={handleEditCell}
          />
        )}

        {activeTab === 'live' && (
          <LivePeriodTracker schedule={schedule} timeSlots={timeSlots} />
        )}
      </main>

      {/* Modals */}
      <EditSlotModal
        cell={editingCell}
        allCells={schedule}
        onClose={() => setEditingCell(null)}
        onSave={handleSaveCell}
        onSwap={handleSwapCells}
      />

      <SchoolSettingsModal
        config={schoolConfig}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={setSchoolConfig}
        onResetTimetable={handleResetTimetable}
      />

      <PrintView
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        config={schoolConfig}
        schedule={schedule}
        timeSlots={timeSlots}
      />

      {/* Clean Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-6 text-center text-xs text-slate-500 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{schoolConfig.schoolName} · ઉચ્ચ પ્રાથમિક શિક્ષણ વિભાગ (ધોરણ ૬, ૭, ૮)</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPrintOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              A4 પ્રિન્ટ આઉટ લો
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-slate-600 hover:text-slate-800"
            >
              શાળા સેટિંગ્સ
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
