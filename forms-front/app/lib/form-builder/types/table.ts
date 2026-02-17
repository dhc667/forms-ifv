import type { Input, InputValue } from './inputs';
import type { LiteralText } from './literal-text';

export type TableCell = Input | LiteralText;
export type TableRow = TableCell[];

export interface TableElement {
  id: string;
  type: 'table';
  rows: TableRow[];
}

export type TableValue = Record<string, InputValue>;
