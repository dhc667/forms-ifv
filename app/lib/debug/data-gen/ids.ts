/**
 * ID Generator for Forms
 * Generates sequential IDs in the format: RML-08-XX
 */

export function generateFormId(index: number): string {
  return `RML-08-${index.toString().padStart(2, '0')}`;
}

// Seed data for potential variations (not used in current pattern)
export const ID_PREFIXES = ['RML', 'QLT', 'INV', 'DOC'] as const;
export const ID_SEQUENCES = ['08', '09', '10', '11', '12'] as const;

/**
 * ID Generator for Schemas
 * Generates sequential IDs in the format: SCH-XXX
 */
export function generateSchemaId(index: number): string {
  return `SCH-${index.toString().padStart(3, '0')}`;
}