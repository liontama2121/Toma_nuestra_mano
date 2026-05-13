import { Section } from './Section';

export interface Course {
  id: string;
  programId: string;
  title: string;
  description: string;
  sections: Section[];
  estimatedMinutes: number;
}
