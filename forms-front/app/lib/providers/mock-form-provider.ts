import type { FormProvider } from './form-provider';
import type { FormSchema, FilledForm, FormComponentValue } from '@/lib/form-builder/types/form';
import type { TableValue } from '@/lib/form-builder/types/table';
import { exampleFormSchema } from '@/lib/debug/data/form-schema';
import { generateMyFormsData } from '@/lib/debug/data-gen';

// Generate mock form metadata
const MOCK_FORMS = generateMyFormsData(25);

// Map to store filled forms in memory
const filledFormsMap = new Map<string, FilledForm>();

/**
 * Generate a random value for a component based on its type
 */
function generateRandomValue(type: string): FormComponentValue {
  switch (type) {
    case 'text-input':
    case 'textarea-input':
      return `Sample text ${Math.floor(Math.random() * 1000)}`;

    case 'number-input':
      return String(Math.floor(Math.random() * 100));

    case 'date':
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      return date.toISOString().split('T')[0];

    case 'single-selection':
      return `option-${Math.floor(Math.random() * 3)}`;

    case 'multiple-selection':
      const count = Math.floor(Math.random() * 3) + 1;
      return Array.from({ length: count }, (_, i) => `option-${i}`);

    case 'image':
      return 'https://example.com/sample-image.jpg';

    default:
      return '';
  }
}

/**
 * Generate sample values for a schema
 */
function generateSampleValues(schema: FormSchema): Record<string, FormComponentValue> {
  const values: Record<string, FormComponentValue> = {};

  schema.questions.forEach((question) => {
    question.components.forEach((component) => {
      if (component.type === 'text') {
        // Text elements contain inputs - store flat
        component.components.forEach((subComponent) => {
          if (subComponent.type !== 'embedded-text') {
            values[subComponent.id] = generateRandomValue(subComponent.type);
          }
        });
      } else if (component.type === 'table') {
        // Tables - store nested values keyed by table ID
        const tableValues: TableValue = {};
        component.rows.forEach((row) => {
          row.forEach((cell) => {
            if (cell.type !== 'embedded-text') {
              tableValues[cell.id] = generateRandomValue(cell.type) as string;
            }
          });
        });
        values[component.id] = tableValues;
      } else {
        // Direct components (selection, image, etc.) - store flat
        values[component.id] = generateRandomValue(component.type);
      }
    });
  });

  return values;
}

/**
 * Generate a filled form from a schema
 */
function generateFilledForm(formMeta: (typeof MOCK_FORMS)[0], schema: FormSchema): FilledForm {
  return {
    id: formMeta.id,
    schemaId: schema.id,
    title: formMeta.titulo,
    estado: formMeta.estado as FilledForm['estado'],
    fechaEnvio: formMeta.fechaEnvio,
    revisadoPor: formMeta.revisadoPor,
    aprobadoPor: formMeta.aprobadoPor,
    values: generateSampleValues(schema),
  };
}

// Initialize filled forms from mock data
MOCK_FORMS.forEach((formMeta, index) => {
  const schema = { ...exampleFormSchema, id: `schema-${index + 1}` };
  filledFormsMap.set(formMeta.id, generateFilledForm(formMeta, schema));
});

/**
 * Mock form provider that stores data in memory
 */
export const mockFormProvider: FormProvider = {
  async getForm(id: string): Promise<FilledForm | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return filledFormsMap.get(id) || null;
  },

  async getSchema(id: string): Promise<FormSchema | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    // For now, return a copy of example schema with the requested ID
    return { ...exampleFormSchema, id };
  },

  async saveForm(form: FilledForm): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    filledFormsMap.set(form.id, form);
  },

  async listForms(): Promise<FilledForm[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return Array.from(filledFormsMap.values());
  },

  async listSchemas(): Promise<FormSchema[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return [exampleFormSchema];
  },
};
