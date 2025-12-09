export interface Student {
  id: string;
  name: string;
  program: string;
  batch: string;
  cgpa: number;
  completedCredits: number;
  avatarUrl: string;
  fatherName?: string;
  motherName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Course {
  code: string;
  title: string;
  credits: number;
  schedule: string;
  instructor: string;
  room: string;
  color: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  type: 'academic' | 'event' | 'admin';
}

export interface Grade {
  semester: string;
  gpa: number;
  totalCredits: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface Assignment {
  id: string;
  courseCode: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Late';
  totalMarks: number;
  obtainedMarks?: number;
  description: string;
}

export interface Quiz {
  id: string;
  courseCode: string;
  title: string;
  date: string;
  duration: string; // e.g., "30 mins"
  totalMarks: number;
  obtainedMarks?: number;
  status: 'Upcoming' | 'Completed' | 'Missed';
}