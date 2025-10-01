export interface EvaluationRequest {
  question: string;
  idealAnswer: string;
  studentAnswer: string;
  useAdvancedRubric: boolean;
}

export interface EvaluationResult {
  score: number;
  feedback: string;
  mistakes: string[];
  strengths: string[];
  idealAnswerCorrection?: {
    isIncorrect: boolean;
    suggestedCorrection: string;
    explanation: string;
  };
  teacherAlert?: string;
}

export interface ApiError {
  message: string;
  type: 'network' | 'api' | 'validation';
}