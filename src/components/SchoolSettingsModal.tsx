import React, { useState } from 'react';
import { SchoolConfig } from '../types/timetable';
import { X, RotateCcw, Save, School, Clock, Calendar } from 'lucide-react';

interface SchoolSettingsModalProps {
  config: SchoolConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: SchoolConfig) => void;
  onResetTimetable: () => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
  onResetTimetable,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<SchoolConfig>({ ...config });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in duration-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base">શાળા સેટિંગ્સ & માહિતી</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              શાળાનું નામ
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                તાલુકો
              </label>
              <input
                type="text"
                value={formData.subDistrict}
                onChange={(e) => setFormData({ ...formData, subDistrict: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                જિલ્લો
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                શૈક્ષણિક વર્ષ
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                આચાર્ય / મુ.શિક્ષક
              </label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              શાળાનો સમયગાળો (પાળી)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, timingType: 'regular' })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  formData.timingType === 'regular'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">નિયમિત પાળી</div>
                <div className="text-[11px] text-slate-500 mt-0.5">૧૦:૪૫ થી ૦૫:૦૦</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, timingType: 'morning' })}
                className={`p-3 rounded-lg border text-left transition-all ${
                  formData.timingType === 'morning'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">સવાર પાળી</div>
                <div className="text-[11px] text-slate-500 mt-0.5">૦૭:૩૦ થી ૧૨:૩૦</div>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('શું તમે સમયપત્રકને મૂળ ડિફોલ્ટ સેટિંગ્સમાં રીસેટ કરવા માંગો છો?')) {
                  onResetTimetable();
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-semibold text-xs py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>મૂળ સમયપત્રક રીસેટ કરો</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              રદ કરો
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
            >
              સેટિંગ્સ સાચવો
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
