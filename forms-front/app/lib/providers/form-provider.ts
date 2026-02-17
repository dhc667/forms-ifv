import type { FormSchema, FilledForm } from '@/lib/form-builder/types/form';

/**
 * Interface for form data providers
 * Implementations can fetch from mock data, API, local storage, etc.
 */
export interface FormProvider {
  /**
   * Get a filled form by ID
   */
  getForm(id: string): Promise<FilledForm | null>;

  /**
   * Get a form schema by ID
   */
  getSchema(id: string): Promise<FormSchema | null>;

  /**
   * Save a filled form
   */
  saveForm(form: FilledForm): Promise<void>;

  /**
   * List all forms (for "My Forms" view)
   */
  listForms(): Promise<FilledForm[]>;

  /**
   * List all schemas (for "Schemas" view)
   */
  listSchemas(): Promise<FormSchema[]>;
}
