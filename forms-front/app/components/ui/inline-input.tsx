import * as React from 'react';
import { cn } from '@/utils';

interface InlineInputProps {
  type?: 'text' | 'number' | 'date';
  id?: string;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  disabled?: boolean;
  className?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
}

function InlineInput({ className, type = 'text', ...props }: InlineInputProps) {
  return (
    <input
      type={type}
      data-slot="inline-input"
      className={cn(
        'border-input bg-input-background mx-1 inline-block h-8 max-w-[200px] min-w-[60px] rounded-md border px-2 py-1 text-sm transition-all duration-150 ease-out outline-none',
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'field-sizing-content disabled:pointer-events-none disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
}

export { InlineInput, type InlineInputProps };
