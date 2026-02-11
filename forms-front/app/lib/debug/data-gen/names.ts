/**
 * Spanish Names Generator for Forms
 * Generates realistic Spanish names for form personnel
 */

const FIRST_NAMES = [
  'María', 'Juan', 'Ana', 'José', 'Carmen', 'Antonio', 'Isabel', 'Manuel',
  'Francisco', 'Pilar', 'David', 'Cristina', 'Miguel', 'Laura', 'Carlos',
  'Teresa', 'Jesús', 'Carmen', 'Rafael', 'Mercedes', 'Pedro', 'Rosa',
  'Ángel', 'Dolores', 'Diego', 'Sonia', 'Javier', 'Lucía', 'Fernando',
  'Pilar', 'Luis', 'Alicia', 'Pablo', 'Mónica', 'Sergio', 'Beatriz',
  'Daniel', 'Silvia', 'Alejandro', 'Natalia', 'Adrián', 'Inés', 'Óscar',
  'Eva', 'Rubén', 'Andrea', 'Iván', 'Claudia', 'Mario', 'Irene'
] as const;

const LAST_NAMES = [
  'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez',
  'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Morales',
  'Ortiz', 'Gutierrez', 'Chavez', 'Ramos', 'Hernández', 'Jiménez', 'Ruiz',
  'Fernández', 'Moreno', 'Álvarez', 'Romero', 'Santos', 'Vargas', 'Castillo',
  'Mendoza', 'Delgado', 'Pena', 'Guerrero', 'Sandoval', 'Luna', 'Santiago',
  'Silva', 'Mejia', 'Soto', 'Del Valle', 'Leon', 'Robles', 'Castro', 'Medina',
  'Cortez', 'Herrera', 'Reyes', 'Aguilar', 'Mendez', 'Morales', 'Vega'
] as const;

export function generateSpanishName(): string {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

export function generateMultipleNames(count: number = 2): string {
  const names: string[] = [];

  for (let i = 0; i < count; i++) {
    let name: string;
    let attempts = 0;

    // Avoid duplicate names in the same entry (up to 3 attempts)
    do {
      name = generateSpanishName();
      attempts++;
    } while (names.includes(name) && attempts < 3);

    names.push(name);
  }

  return names.join(', ');
}

// Seed data for name generation
export const NAME_SEEDS = {
  firstNames: FIRST_NAMES,
  lastNames: LAST_NAMES
} as const;