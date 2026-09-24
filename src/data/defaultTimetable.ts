import { DayOfWeek, Standard, TeacherId, TeacherInfo, SubjectInfo, TimeSlot, TimetableCell, SchoolConfig, ClashWarning } from '../types/timetable';

export const DAYS_OF_WEEK: DayOfWeek[] = ['સોમવાર', 'મંગળવાર', 'બુધવાર', 'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'];

export const STANDARDS: Standard[] = ['ધોરણ ૬', 'ધોરણ ૭', 'ધોરણ ૮'];

export const TEACHERS: TeacherInfo[] = [
  {
    id: 'dipika',
    name: 'દીપીકાબેન',
    designation: 'ગણિત - વિજ્ઞાન શિક્ષિકા',
    assignedSubjects: ['ગણિત', 'વિજ્ઞાન', 'વિજ્ઞાન પ્રયોગશાળા'],
    color: 'emerald',
    lightBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badgeBorder: 'border-emerald-300'
  },
  {
    id: 'jayendra',
    name: 'જયેન્દ્રસિંહ',
    designation: 'ભાષા શિક્ષક (અંગ્રેજી - ગુજરાતી)',
    assignedSubjects: ['અંગ્રેજી', 'ગુજરાતી', 'સંસ્કૃત', 'વાંચન/પુસ્તકાલય'],
    color: 'blue',
    lightBg: 'bg-blue-50 text-blue-800 border-blue-200',
    badgeBorder: 'border-blue-300'
  },
  {
    id: 'naresh',
    name: 'નરેશભાઈ',
    designation: 'સામાજિક વિજ્ઞાન - હિન્દી શિક્ષક',
    assignedSubjects: ['સામાજિક વિજ્ઞાન', 'હિન્દી', 'શારીરિક શિક્ષણ (પી.ટી.)', 'ચિત્રકામ'],
    color: 'amber',
    lightBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeBorder: 'border-amber-300'
  }
];

export const SUBJECTS: SubjectInfo[] = [
  { id: 'maths', name: 'ગણિત', defaultTeacherId: 'dipika', color: 'emerald', category: 'core' },
  { id: 'science', name: 'વિજ્ઞાન', defaultTeacherId: 'dipika', color: 'teal', category: 'core' },
  { id: 'english', name: 'અંગ્રેજી', defaultTeacherId: 'jayendra', color: 'blue', category: 'core' },
  { id: 'gujarati', name: 'ગુજરાતી', defaultTeacherId: 'jayendra', color: 'indigo', category: 'core' },
  { id: 'social_sci', name: 'સામાજિક વિજ્ઞાન', defaultTeacherId: 'naresh', color: 'amber', category: 'core' },
  { id: 'hindi', name: 'હિન્દી', defaultTeacherId: 'naresh', color: 'orange', category: 'core' },
  { id: 'sanskrit', name: 'સંસ્કૃત', defaultTeacherId: 'jayendra', color: 'purple', category: 'core' },
  { id: 'pt', name: 'શારીરિક શિક્ષણ (પી.ટી.)', defaultTeacherId: 'naresh', color: 'rose', category: 'activity' },
  { id: 'art', name: 'ચિત્રકામ / કલા', defaultTeacherId: 'naresh', color: 'pink', category: 'activity' },
  { id: 'library', name: 'વાંચન / પુસ્તકાલય', defaultTeacherId: 'jayendra', color: 'cyan', category: 'activity' },
  { id: 'computer', name: 'કમ્પ્યુટર / પ્રાયોગિક', defaultTeacherId: 'dipika', color: 'violet', category: 'activity' },
  { id: 'balsabha', name: 'બાળસભા / પ્રવૃત્તિ', defaultTeacherId: 'naresh', color: 'yellow', category: 'activity' },
];

export const REGULAR_TIME_SLOTS: TimeSlot[] = [
  { periodNumber: 0, isBreak: true, name: 'પ્રાર્થના સભા / દૈનિક સંમેલન', startTime: '10:45', endTime: '11:00', durationMinutes: 15 },
  { periodNumber: 1, name: 'તાસ ૧', startTime: '11:00', endTime: '11:40', durationMinutes: 40 },
  { periodNumber: 2, name: 'તાસ ૨', startTime: '11:40', endTime: '12:20', durationMinutes: 40 },
  { periodNumber: 3, name: 'તાસ ૩', startTime: '12:20', endTime: '01:00', durationMinutes: 40 },
  { periodNumber: 4, name: 'તાસ ૪', startTime: '01:00', endTime: '01:40', durationMinutes: 40 },
  { periodNumber: 99, isBreak: true, name: 'મધ્યાહ્ન ભોજન / મોટી રીસેસ', startTime: '01:40', endTime: '02:20', durationMinutes: 40 },
  { periodNumber: 5, name: 'તાસ ૫', startTime: '02:20', endTime: '03:00', durationMinutes: 40 },
  { periodNumber: 6, name: 'તાસ ૬', startTime: '03:00', endTime: '03:35', durationMinutes: 35 },
  { periodNumber: 98, isBreak: true, name: 'લઘુ વિરામ (નાની રીસેસ)', startTime: '03:35', endTime: '03:45', durationMinutes: 10 },
  { periodNumber: 7, name: 'તાસ ૭', startTime: '03:45', endTime: '04:20', durationMinutes: 35 },
  { periodNumber: 8, name: 'તાસ ૮', startTime: '04:20', endTime: '04:55', durationMinutes: 35 },
  { periodNumber: 100, isBreak: true, name: 'રાષ્ટ્રગીત / વંદે માતરમ્', startTime: '04:55', endTime: '05:00', durationMinutes: 5 },
];

export const MORNING_TIME_SLOTS: TimeSlot[] = [
  { periodNumber: 0, isBreak: true, name: 'પ્રાર્થના સભા', startTime: '07:30', endTime: '07:45', durationMinutes: 15 },
  { periodNumber: 1, name: 'તાસ ૧', startTime: '07:45', endTime: '08:20', durationMinutes: 35 },
  { periodNumber: 2, name: 'તાસ ૨', startTime: '08:20', endTime: '08:55', durationMinutes: 35 },
  { periodNumber: 3, name: 'તાસ ૩', startTime: '08:55', endTime: '09:30', durationMinutes: 35 },
  { periodNumber: 99, isBreak: true, name: 'અલ્પાહાર / રીસેસ', startTime: '09:30', endTime: '09:50', durationMinutes: 20 },
  { periodNumber: 4, name: 'તાસ ૪', startTime: '09:50', endTime: '10:25', durationMinutes: 35 },
  { periodNumber: 5, name: 'તાસ ૫', startTime: '10:25', endTime: '11:00', durationMinutes: 35 },
  { periodNumber: 6, name: 'તાસ ૬', startTime: '11:00', endTime: '11:35', durationMinutes: 35 },
  { periodNumber: 7, name: 'તાસ ૭', startTime: '11:35', endTime: '12:05', durationMinutes: 30 },
  { periodNumber: 8, name: 'તાસ ૮ / બાળસભા', startTime: '12:05', endTime: '12:30', durationMinutes: 25 },
];

export const DEFAULT_SCHOOL_CONFIG: SchoolConfig = {
  schoolName: 'શ્રી પ્રાથમિક શાળા - કેન્દ્રશાળા',
  subDistrict: 'તાલુકો - શિક્ષણ વિભાગ',
  district: 'ગુજરાત રાજ્ય',
  academicYear: '૨૦૨૬-૨૭',
  principalName: 'મુખ્ય શિક્ષકશ્રી',
  timingType: 'regular',
};

// Generate clash-free default timetable
export function generateDefaultTimetable(): TimetableCell[] {
  const schedule: TimetableCell[] = [];

  // Patterns per day to give balanced curriculum across the week
  // For each day and each period (1 to 8):
  // We guarantee {std6.teacher, std7.teacher, std8.teacher} has no duplicate teacherId!
  const dayPatterns: Record<DayOfWeek, Record<number, { s6: [string, TeacherId], s7: [string, TeacherId], s8: [string, TeacherId] }>> = {
    'સોમવાર': {
      1: { s6: ['ગણિત', 'dipika'], s7: ['ગુજરાતી', 'jayendra'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      2: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['હિન્દી', 'naresh'], s8: ['વિજ્ઞાન', 'dipika'] },
      3: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['ગણિત', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      4: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['હિન્દી', 'naresh'] },
      5: { s6: ['ગુજરાતી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] },
      6: { s6: ['હિન્દી', 'naresh'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['ગુજરાતી', 'jayendra'] },
      7: { s6: ['સંસ્કૃત', 'jayendra'], s7: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'], s8: ['કમ્પ્યુટર / પ્રાયોગિક', 'dipika'] },
      8: { s6: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'], s7: ['કમ્પ્યુટર / પ્રાયોગિક', 'dipika'], s8: ['સંસ્કૃત', 'jayendra'] },
    },
    'મંગળવાર': {
      1: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['હિન્દી', 'naresh'] },
      2: { s6: ['ગુજરાતી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] },
      3: { s6: ['ગણિત', 'dipika'], s7: ['ગુજરાતી', 'jayendra'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      4: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      5: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['હિન્દી', 'naresh'], s8: ['વિજ્ઞાન', 'dipika'] },
      6: { s6: ['હિન્દી', 'naresh'], s7: ['ગણિત', 'dipika'], s8: ['ગુજરાતી', 'jayendra'] },
      7: { s6: ['વાંચન / પુસ્તકાલય', 'jayendra'], s7: ['ચિત્રકામ / કલા', 'naresh'], s8: ['ગણિત પુનરાવર્તન', 'dipika'] },
      8: { s6: ['ચિત્રકામ / કલા', 'naresh'], s7: ['ગણિત પુનરાવર્તન', 'dipika'], s8: ['વાંચન / પુસ્તકાલય', 'jayendra'] },
    },
    'બુધવાર': {
      1: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['ગણિત', 'dipika'], s8: ['ગુજરાતી', 'jayendra'] },
      2: { s6: ['ગણિત', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['હિન્દી', 'naresh'] },
      3: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      4: { s6: ['હિન્દી', 'naresh'], s7: ['ગુજરાતી', 'jayendra'], s8: ['ગણિત', 'dipika'] },
      5: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['અંગ્રેજી', 'jayendra'] },
      6: { s6: ['ગુજરાતી', 'jayendra'], s7: ['હિન્દી', 'naresh'], s8: ['વિજ્ઞાન', 'dipika'] },
      7: { s6: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'], s7: ['સંસ્કૃત', 'jayendra'], s8: ['વિજ્ઞાન પ્રયોગશાળા', 'dipika'] },
      8: { s6: ['વિજ્ઞાન પ્રયોગશાળા', 'dipika'], s7: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'], s8: ['સંસ્કૃત', 'jayendra'] },
    },
    'ગુરુવાર': {
      1: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] },
      2: { s6: ['હિન્દી', 'naresh'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      3: { s6: ['ગણિત', 'dipika'], s7: ['ગુજરાતી', 'jayendra'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      4: { s6: ['ગુજરાતી', 'jayendra'], s7: ['ગણિત', 'dipika'], s8: ['હિન્દી', 'naresh'] },
      5: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['ગુજરાતી', 'jayendra'] }, // notice: handle carefully below
      6: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['ગણિત', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      7: { s6: ['સંસ્કૃત', 'jayendra'], s7: ['ચિત્રકામ / કલા', 'naresh'], s8: ['કમ્પ્યુટર / પ્રાયોગિક', 'dipika'] },
      8: { s6: ['ચિત્રકામ / કલા', 'naresh'], s7: ['કમ્પ્યુટર / પ્રાયોગિક', 'dipika'], s8: ['સંસ્કૃત', 'jayendra'] },
    },
    'શુક્રવાર': {
      1: { s6: ['ગણિત', 'dipika'], s7: ['ગુજરાતી', 'jayendra'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      2: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['હિન્દી', 'naresh'] },
      3: { s6: ['ગુજરાતી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] },
      4: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['હિન્દી', 'naresh'], s8: ['વિજ્ઞાન', 'dipika'] },
      5: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['ગણિત', 'dipika'], s8: ['ગુજરાતી', 'jayendra'] },
      6: { s6: ['હિન્દી', 'naresh'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      7: { s6: ['કમ્પ્યુટર / પ્રાયોગિક', 'dipika'], s7: ['સંસ્કૃત', 'jayendra'], s8: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'] },
      8: { s6: ['સંસ્કૃત', 'jayendra'], s7: ['વિજ્ઞાન પ્રયોગશાળા', 'dipika'], s8: ['ચિત્રકામ / કલા', 'naresh'] },
    },
    'શનિવાર': {
      1: { s6: ['વિજ્ઞાન', 'dipika'], s7: ['અંગ્રેજી', 'jayendra'], s8: ['સામાજિક વિજ્ઞાન', 'naresh'] },
      2: { s6: ['ગણિત', 'dipika'], s7: ['હિન્દી', 'naresh'], s8: ['ગુજરાતી', 'jayendra'] },
      3: { s6: ['ગુજરાતી', 'jayendra'], s7: ['ગણિત', 'dipika'], s8: ['વિજ્ઞાન', 'dipika'] }, // adjusted below
      4: { s6: ['સામાજિક વિજ્ઞાન', 'naresh'], s7: ['વિજ્ઞાન', 'dipika'], s8: ['અંગ્રેજી', 'jayendra'] },
      5: { s6: ['અંગ્રેજી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] },
      6: { s6: ['હિન્દી', 'naresh'], s7: ['ગુજરાતી', 'jayendra'], s8: ['વિજ્ઞાન', 'dipika'] },
      7: { s6: ['શારીરિક શિક્ષણ (પી.ટી.)', 'naresh'], s7: ['વાંચન / પુસ્તકાલય', 'jayendra'], s8: ['ગણિત ક્વિઝ', 'dipika'] },
      8: { s6: ['બાળસભા / પ્રવૃત્તિ', 'naresh'], s7: ['બાળસભા / પ્રવૃત્તિ', 'jayendra'], s8: ['બાળસભા / પ્રવૃત્તિ', 'dipika'] },
    }
  };

  // Fix exact zero-clash mapping for Thursday period 5 & Saturday period 3
  dayPatterns['ગુરુવાર'][5] = { s6: ['વિજ્ઞાન', 'dipika'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગુજરાતી', 'jayendra'] };
  dayPatterns['શનિવાર'][3] = { s6: ['ગુજરાતી', 'jayendra'], s7: ['સામાજિક વિજ્ઞાન', 'naresh'], s8: ['ગણિત', 'dipika'] };

  DAYS_OF_WEEK.forEach(day => {
    const dayData = dayPatterns[day];
    for (let p = 1; p <= 8; p++) {
      const slot = dayData[p];
      if (slot) {
        schedule.push({
          day,
          periodNumber: p,
          standard: 'ધોરણ ૬',
          subject: slot.s6[0],
          teacherId: slot.s6[1],
        });
        schedule.push({
          day,
          periodNumber: p,
          standard: 'ધોરણ ૭',
          subject: slot.s7[0],
          teacherId: slot.s7[1],
        });
        schedule.push({
          day,
          periodNumber: p,
          standard: 'ધોરણ ૮',
          subject: slot.s8[0],
          teacherId: slot.s8[1],
        });
      }
    }
  });

  return schedule;
}

// Function to detect clashes in the timetable
export function detectClashes(cells: TimetableCell[]): ClashWarning[] {
  const warnings: ClashWarning[] = [];

  DAYS_OF_WEEK.forEach(day => {
    for (let p = 1; p <= 8; p++) {
      const periodCells = cells.filter(c => c.day === day && c.periodNumber === p);
      const teacherClassMap = new Map<TeacherId, Standard[]>();

      periodCells.forEach(cell => {
        if (cell.teacherId && cell.teacherId !== 'none' && cell.teacherId !== 'other') {
          const list = teacherClassMap.get(cell.teacherId) || [];
          list.push(cell.standard);
          teacherClassMap.set(cell.teacherId, list);
        }
      });

      teacherClassMap.forEach((standards, teacherId) => {
        if (standards.length > 1) {
          const teacherObj = TEACHERS.find(t => t.id === teacherId);
          warnings.push({
            day,
            periodNumber: p,
            teacherId,
            teacherName: teacherObj ? teacherObj.name : teacherId,
            standards,
          });
        }
      });
    }
  });

  return warnings;
}
