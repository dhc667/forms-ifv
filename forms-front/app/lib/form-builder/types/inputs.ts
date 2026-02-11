export interface InputBase {
  id: string;
  required?: boolean;
}

export type TextInput = InputBase & {
  type: 'text-input';
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export type DateInput = InputBase & {
  type: 'date';
  validation?: {
    min?: Date;
    max?: Date;
  };
}

export type NumberInput = InputBase & {
  type: 'number-input';
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
  };
}

export type ReferenceInput = InputBase & {
  type: 'reference-input';
}

export interface SelectionInputOption {
  id: string;
  title: string;
}

export type SelectionInput = InputBase & {
  id: string;
  type: 'selection-input';
  required?: boolean;
}

export type TextAreaInput = InputBase & {
  type: 'textarea-input';
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    rows?: number;
  };
}

export type Input = TextInput | DateInput | NumberInput | TextAreaInput | ReferenceInput | SelectionInput;
