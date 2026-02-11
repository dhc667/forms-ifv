/**
 * Data Generators Collection
 * Combines all generators to create form rows for the forms table
 */

import { generateFormId, generateSchemaId } from './ids';
import { generateRandomDate } from './dates';
import { generateSpanishName, generateMultipleNames } from './names';
import { generateFormTitle } from './titles';
import type { FormRow, SchemaRow, MyFormRow } from './types';

/**
 * Generate an array of form rows with realistic sample data
 */
export function generateFormsData(count: number): FormRow[] {
  return Array.from({ length: count }, (_, index) => {
    const formIndex = index + 1; // 1-based indexing for IDs and titles

    return {
      id: generateFormId(formIndex),
      titulo: generateFormTitle(formIndex),
      elaborado: generateSpanishName(),
      revisado: Math.random() > 0.7 ? generateMultipleNames(2) : generateSpanishName(),
      aprobado: generateSpanishName(),
      fecha: generateRandomDate()
    };
  });
}

/**
 * Generate a single form row (useful for testing)
 */
export function generateSingleForm(index: number = 1): FormRow {
  return generateFormsData(1)[0];
}

/**
 * Generate an array of schema rows with realistic sample data
 */
export function generateSchemasData(count: number): SchemaRow[] {
  const estados: SchemaRow['estado'][] = ['activo', 'borrador', 'archivado'];

  return Array.from({ length: count }, (_, index) => {
    const schemaIndex = index + 1;

    return {
      id: generateSchemaId(schemaIndex),
      titulo: generateFormTitle(schemaIndex),
      version: `v${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 10)}`,
      creadoPor: generateSpanishName(),
      fechaCreacion: generateRandomDate(),
      estado: estados[Math.floor(Math.random() * estados.length)]
    };
  });
}

/**
 * Generate an array of my form rows with realistic sample data
 */
export function generateMyFormsData(count: number): MyFormRow[] {
  const estados: MyFormRow['estado'][] = ['draft', 'pending', 'approved'];
  const estadoWeights = [0.3, 0.4, 0.3]; // 30% draft, 40% pending, 30% approved

  return Array.from({ length: count }, (_, index) => {
    const formIndex = index + 1;
    const random = Math.random();
    let estado: MyFormRow['estado'];
    
    if (random < estadoWeights[0]) {
      estado = 'draft';
    } else if (random < estadoWeights[0] + estadoWeights[1]) {
      estado = 'pending';
    } else {
      estado = 'approved';
    }

    const baseForm: MyFormRow = {
      id: generateFormId(formIndex),
      titulo: generateFormTitle(formIndex),
      estado
    };

    // Add optional fields based on status
    if (estado !== 'draft') {
      baseForm.fechaEnvio = generateRandomDate();
      baseForm.revisadoPor = generateSpanishName();
    }

    if (estado === 'approved') {
      baseForm.aprobadoPor = generateSpanishName();
    }

    return baseForm;
  });
}

// Re-export individual generators for direct use
export { generateFormId, generateSchemaId } from './ids';
export { generateRandomDate } from './dates';
export { generateSpanishName, generateMultipleNames } from './names';
export { generateFormTitle, getAlphabetizedSequence } from './titles';

// Export types
export type { FormRow, SchemaRow, MyFormRow, DataGeneratorOptions } from './types';