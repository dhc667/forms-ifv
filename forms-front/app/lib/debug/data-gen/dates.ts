/**
 * Date Generator for Forms
 * Generates random dates in DD-MM-YYYY format throughout 2024
 */

const MONTHS = [
  '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12'
] as const;

const DAYS_IN_MONTH = {
  '01': 31, '02': 29, '03': 31, '04': 30, '05': 31, '06': 30,
  '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31
} as const;

export function generateRandomDate(startDate?: Date, endDate?: Date): string {
  const start = startDate || new Date(2024, 0, 1); // January 1, 2024
  const end = endDate || new Date(2024, 11, 31); // December 31, 2024

  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);

  const date = new Date(randomTime);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// Seed data for date generation
export const DATE_SEEDS = {
  months: MONTHS,
  daysInMonth: DAYS_IN_MONTH,
  year: 2024
} as const;