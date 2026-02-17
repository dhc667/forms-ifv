import type { Question } from './question';
import type { TextValue } from './text';
import type { TableValue } from './table';
import type { SelectionValue } from './selection';
import type { ImageValue } from './image';

export interface FormSchema {
  title: string;
  id: string;
  questions: Question[];
}

export type FormComponentValue = TextValue | TableValue | SelectionValue | ImageValue;

export interface FilledForm {
  id: string;
  schemaId: string;
  title: string;
  estado: 'draft' | 'pending' | 'approved';
  fechaEnvio?: string;
  revisadoPor?: string;
  aprobadoPor?: string;
  values: Record<string, FormComponentValue>;
}
