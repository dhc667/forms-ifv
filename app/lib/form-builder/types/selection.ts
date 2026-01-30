export interface SelectionOption {
  id: string;
  title: string;
}

export interface SelectionBase {
  id: string;
  title?: string; // Optional title for the selection group
}

export type SingleSelection = SelectionBase & {
  type: 'single-selection';
  options: SelectionOption[];
};

export type MultipleSelection = SelectionBase & {
  type: 'multiple-selection';
  options: SelectionOption[];
};

export type SelectionElement = SingleSelection | MultipleSelection;

