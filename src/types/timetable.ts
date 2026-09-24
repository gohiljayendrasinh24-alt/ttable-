export type DayOfWeek = 'સોમવાર' | 'મંગળવાર' | 'બુધવાર' | 'ગુરુવાર' | 'શુક્રવાર' | 'શનિવાર';

export type Standard = 'ધોરણ ૬' | 'ધોરણ ૭' | 'ધોરણ ૮';

export type TeacherId = 'dipika' | 'jayendra' | 'naresh' | 'other' | 'none';

export interface TeacherInfo {
  id: TeacherId;
  name: string;
  designation: string;
  assignedSubjects: string[];
  color: string;
  lightBg: string;
  badgeBorder: string;
}

export interface SubjectInfo {
  id: string;
  name: string;
  defaultTeacherId: TeacherId;
  color: string;
  category: 'core' | 'activity' | 'break';
}

export interface TimeSlot {
  periodNumber: number; // 0 for assembly, 1-8 for periods, 99 for recess
  isBreak?: boolean;
  name: string; // e.g. "પ્રાર્થના સભા", "તાસ ૧", "મધ્યાહ્ન ભોજન"
  startTime: string; // "10:45"
  endTime: string; // "11:00"
  durationMinutes: number;
}

export interface TimetableCell {
  day: DayOfWeek;
  periodNumber: number;
  standard: Standard;
  subject: string;
  teacherId: TeacherId;
  customTeacherName?: string;
  room?: string;
  note?: string;
}

export interface SchoolConfig {
  schoolName: string;
  subDistrict: string;
  district: string;
  academicYear: string;
  principalName: string;
  timingType: 'regular' | 'morning';
}

export interface ClashWarning {
  day: DayOfWeek;
  periodNumber: number;
  teacherId: TeacherId;
  teacherName: string;
  standards: Standard[];
}
