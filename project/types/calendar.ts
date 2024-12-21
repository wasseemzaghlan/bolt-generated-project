"use client";

export interface ExamInfo {
  id: string;
  title: string;
  program: string;
  provider: string;
  subject: string;
  chapter?: string;
  topic?: string;
  year: number;
}

export interface CalendarActivity {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'study' | 'exam' | 'practice' | 'other';
  duration?: number;
  examInfo?: ExamInfo;
}

export interface CreateActivityData {
  title: string;
  description?: string;
  date: Date;
  time?: string;
  type: 'study' | 'exam' | 'practice' | 'other';
  duration?: number;
  examInfo?: ExamInfo;
}

export interface UpdateActivityData extends Partial<CreateActivityData> {
  id: string;
}
