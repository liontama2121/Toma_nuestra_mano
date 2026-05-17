export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export interface Quiz {
  sectionId: string;
  title: string;
  passingScore: number; // porcentaje mínimo para pasar
  questions: QuizQuestion[];
}
