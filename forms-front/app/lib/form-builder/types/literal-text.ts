import { generateUUID } from '@/lib/uuid';

export interface LiteralText {
  id: string;
  type: 'embedded-text';
  content: string;
}

// Helper for creating new literal text
export function createLiteralText(content: string): LiteralText {
  return {
    id: generateUUID(),
    type: 'embedded-text',
    content
  };
}
