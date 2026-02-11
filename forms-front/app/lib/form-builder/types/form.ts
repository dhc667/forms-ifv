import type { Question } from "./question";

export interface FormSchema {
  title: string;
  id: string;
  questions: Question[];
}
