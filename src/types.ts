export interface Doctor {
  id: string;
  name: string;
  email: string;
  hospital: string;
  department: string;
  state: string;
  country: string;
  contributions: number;
  points: number;
  registrationDate?: string;
  lastLoginDate?: string;
  lastSubmissionDate?: string;
  rank?: number;
}

export interface HandwritingSample {
  id: string;
  doctorId: string;
  doctorEmail: string;
  strokes: number[][][]; // [[[x1, y1, t1], [x2, y2, t2]], ...] - arrays of stroke points with timestamps
  transcription: string;
  timestamp: string;
  points: number;
}

export interface ApiResponse<T> {
  message?: string;
  error?: string;
  data?: T;
}