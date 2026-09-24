import React from 'react';
import { Calendar, Printer, Settings, Clock, UserCheck, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SchoolConfig, ClashWarning } from '../types/timetable';

interface NavbarProps {
  activeTab: 'master' | 'class' | 'teacher' | 'live';
  setActiveTab: (tab: 'master' | 'class' | 'teacher' | 'live') => void;
  schoolConfig: SchoolConfig;
  onOpenSettings: () => void;
  onPrint: () => void;
  clashes: ClashWarning[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  schoolConfig,
  onOpenSettings,
  onPrint,
  clashes,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  શાળા સમયપત્રક
                </h1>
                <span className="text-xs px-2 py-0.5 font-medium rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  ધોરણ ૬, ૭, ૮
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-[240px] sm:max-w-sm">
                {schoolConfig.schoolName} · {schoolConfig.academicYear}
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation views */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('master')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'master'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              માસ્ટર સમયપત્રક
            </button>
            <button
              onClick={() => setActiveTab('class')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'class'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ધોરણવાર વ્યુ
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'teacher'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              શિક્ષકવાર વ્યુ
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'live'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              લાઈવ તાસ
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2">
            {clashes.length > 0 ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{clashes.length} તાસ ક્લેશ</span>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-1 px-2 py-1 text-xs text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>૧૦૦% ક્લેશ-મુક્ત</span>
              </div>
            )}

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors shadow-xs"
              title="સમયપત્રક પ્રિન્ટ કરો"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>પ્રિન્ટ / PDF</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title="શાળા સેટિંગ્સ"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('master')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'master' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            માસ્ટર
          </button>
          <button
            onClick={() => setActiveTab('class')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'class' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            ધોરણવાર
          </button>
          <button
            onClick={() => setActiveTab('teacher')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'teacher' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            શિક્ષકવાર
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap ${
              activeTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            લાઈવ તાસ
          </button>
        </div>
      </div>
    </header>
  );
};
