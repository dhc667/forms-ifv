/**
 * Form Titles Generator
 * Generates titles in the format: <Validación|Creación> <number> de Producto <alphabetized>
 */

const ACTION_WORDS = ['Validación', 'Creación'] as const;
const PRODUCT_TYPES = ['Producto'] as const; // As specified, keeping only "Producto"

export function generateFormTitle(index: number): string {
  const action = ACTION_WORDS[Math.floor(Math.random() * ACTION_WORDS.length)];
  const productType = PRODUCT_TYPES[Math.floor(Math.random() * PRODUCT_TYPES.length)];
  const alphabetized = numberToLetters(index);

  return `${action} ${index} de ${productType} ${alphabetized}`;
}

/**
 * Convert a number to Excel-style column letters (A, B, ..., Z, AA, AB, etc.)
 */
function numberToLetters(num: number): string {
  let result = '';
  let n = num;

  while (n > 0) {
    n--; // Adjust for 1-based indexing
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }

  return result || 'A'; // Handle case where num = 0
}

// Seed data for title generation
export const TITLE_SEEDS = {
  actionWords: ACTION_WORDS,
  productTypes: PRODUCT_TYPES
} as const;

// Helper function for testing alphabetized conversion
export function getAlphabetizedSequence(count: number): string[] {
  return Array.from({ length: count }, (_, i) => numberToLetters(i + 1));
}