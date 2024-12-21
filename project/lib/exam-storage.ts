import { ExamRecord, ExamScore, ExamAnswer } from '@/types/exam';

const EXAM_RECORDS_KEY = 'wizardry_exam_records';

export function saveExamRecord(
  examTitle: string,
  score: ExamScore,
  answers: ExamAnswer[],
  duration: number
): ExamRecord {
  const examRecord: ExamRecord = {
    id: generateExamId(),
    examTitle,
    studentId: getOrCreateStudentId(),
    completedAt: new Date().toISOString(),
    score,
    answers,
    duration
  };

  if (typeof window !== 'undefined') {
    const existingRecords = getExamRecords();
    localStorage.setItem(
      EXAM_RECORDS_KEY,
      JSON.stringify([...existingRecords, examRecord])
    );
  }

  return examRecord;
}

export function getExamRecords(): ExamRecord[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const records = localStorage.getItem(EXAM_RECORDS_KEY);
  return records ? JSON.parse(records) : [];
}

export function getExamRecordById(id: string): ExamRecord | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const records = getExamRecords();
  return records.find(record => record.id === id);
}

function generateExamId(): string {
  return `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getOrCreateStudentId(): string {
  const STUDENT_ID_KEY = 'wizardry_student_id';
  if (typeof window === 'undefined') {
    return 'default_student';
  }
  
  let studentId = localStorage.getItem(STUDENT_ID_KEY);
  
  if (!studentId) {
    studentId = `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STUDENT_ID_KEY, studentId);
  }
  
  return studentId;
}
