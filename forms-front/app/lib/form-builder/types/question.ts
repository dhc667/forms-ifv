import type { ImageElement } from "./image";
import type { SelectionElement } from "./selection";
import type { TableElement as TableElement } from "./table";
import type { TextElement } from "./text";

export type QuestionComponent = TextElement | TableElement | SelectionElement | ImageElement

export interface Question {
  id: string;
  components: QuestionComponent[];
}
