import type { TextElement } from '@/lib/form-builder/types/text';
import type { TableElement } from '@/lib/form-builder/types/table';
import type { SelectionElement } from '@/lib/form-builder/types/selection';
import type { ImageElement } from '@/lib/form-builder/types/image';
import type { QuestionComponent } from '@/lib/form-builder/types/question';

export interface SidebarElementFactory {
  id: string;
  type: 'text' | 'table' | 'selection' | 'image';
  createElement: (t: any) => QuestionComponent;
}

export const createSidebarElements = (t: any): SidebarElementFactory[] => [
  // Text Components
  {
    id: 'text-input',
    type: 'text',
    createElement: (): TextElement => ({
      id: 'preview-text-input',
      type: 'text',
      components: [
        {
          id: 'text-input-label',
          type: 'embedded-text',
          content: t('sidebarLabels.textInput', { ns: 'form-builder' }),
        },
        {
          id: 'text-input-field',
          type: 'text-input',
          placeholder: t('placeholders.textInput', { ns: 'form-builder' }),
        },
      ],
    }),
  },
  {
    id: 'number-input',
    type: 'text',
    createElement: (): TextElement => ({
      id: 'preview-number-input',
      type: 'text',
      components: [
        {
          id: 'number-input-label',
          type: 'embedded-text',
          content: t('sidebarLabels.numberInput', { ns: 'form-builder' }),
        },
        {
          id: 'number-input-field',
          type: 'number-input',
          placeholder: t('placeholders.numberInput', { ns: 'form-builder' }),
        },
      ],
    }),
  },
  {
    id: 'date-input',
    type: 'text',
    createElement: (): TextElement => ({
      id: 'preview-date-input',
      type: 'text',
      components: [
        {
          id: 'date-input-label',
          type: 'embedded-text',
          content: t('sidebarLabels.dateInput', { ns: 'form-builder' }),
        },
        {
          id: 'date-input-field',
          type: 'date',
        },
      ],
    }),
  },
  {
    id: 'textarea-input',
    type: 'text',
    createElement: (): TextElement => ({
      id: 'preview-textarea-input',
      type: 'text',
      components: [
        {
          id: 'textarea-input-label',
          type: 'embedded-text',
          content: t('sidebarLabels.textareaInput', { ns: 'form-builder' }),
        },
        {
          id: 'textarea-input-field',
          type: 'textarea-input',
          placeholder: t('placeholders.textareaInput', { ns: 'form-builder' }),
          validation: { rows: 3 },
        },
      ],
    }),
  },
  // Table Components
  {
    id: 'basic-table',
    type: 'table',
    createElement: (): TableElement => ({
      id: 'preview-basic-table',
      type: 'table',
      rows: [
        // Header row
        [
          {
            id: 'table-header-1',
            type: 'embedded-text',
            content: t('table.texts', { ns: 'form-builder' }),
          },
          {
            id: 'table-header-2',
            type: 'embedded-text',
            content: t('table.numbers', { ns: 'form-builder' }),
          },
        ],
        // Data row 1
        [
          {
            id: 'table-data-1',
            type: 'text-input',
            placeholder: t('placeholders.textInput', { ns: 'form-builder' }),
          },
          {
            id: 'table-data-2',
            type: 'number-input',
            placeholder: t('placeholders.numberInput', { ns: 'form-builder' }),
          },
        ],
        // Data row 2
        [
          {
            id: 'table-data-3',
            type: 'text-input',
            placeholder: t('placeholders.textInput', { ns: 'form-builder' }),
          },
          {
            id: 'table-data-4',
            type: 'number-input',
            placeholder: t('placeholders.numberInput', { ns: 'form-builder' }),
          },
        ],
      ],
    }),
  },
  // Selection Components
  {
    id: 'radio-group-with-title',
    type: 'selection',
    createElement: (): SelectionElement => {
      const radioOptions = t('options.radio', {
        ns: 'form-builder',
        returnObjects: true,
      }) as string[];
      return {
        id: 'preview-radio-group-with-title',
        type: 'single-selection',
        title: t('sidebarLabels.radioGroupTitle', { ns: 'form-builder' }),
        options: radioOptions.map((option, index) => ({
          id: `radio-option-${index + 1}`,
          title: option,
        })),
      };
    },
  },
  {
    id: 'radio-group-no-title',
    type: 'selection',
    createElement: (): SelectionElement => {
      const radioOptions = t('options.radio', {
        ns: 'form-builder',
        returnObjects: true,
      }) as string[];
      return {
        id: 'preview-radio-group-no-title',
        type: 'single-selection',
        options: radioOptions.map((option, index) => ({
          id: `radio-option-${index + 1}`,
          title: option,
        })),
      };
    },
  },
  {
    id: 'checkbox-group-with-title',
    type: 'selection',
    createElement: (): SelectionElement => {
      const checkboxOptions = t('options.checkbox', {
        ns: 'form-builder',
        returnObjects: true,
      }) as string[];
      return {
        id: 'preview-checkbox-group-with-title',
        type: 'multiple-selection',
        title: t('sidebarLabels.checkboxGroupTitle', { ns: 'form-builder' }),
        options: checkboxOptions.map((option, index) => ({
          id: `checkbox-option-${index + 1}`,
          title: option,
        })),
      };
    },
  },
  {
    id: 'checkbox-group-no-title',
    type: 'selection',
    createElement: (): SelectionElement => {
      const checkboxOptions = t('options.checkbox', {
        ns: 'form-builder',
        returnObjects: true,
      }) as string[];
      return {
        id: 'preview-checkbox-group-no-title',
        type: 'multiple-selection',
        options: checkboxOptions.map((option, index) => ({
          id: `checkbox-option-${index + 1}`,
          title: option,
        })),
      };
    },
  },
  // Image Components
  {
    id: 'image-upload',
    type: 'image',
    createElement: (): ImageElement => ({
      id: 'preview-image-upload',
      type: 'image',
      title: t('sidebarLabels.imageUpload', { ns: 'form-builder' }),
    }),
  },
];
