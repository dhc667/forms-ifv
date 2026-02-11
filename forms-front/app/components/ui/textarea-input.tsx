import * as React from "react";
import { cn } from "@/utils";

interface TextAreaInputProps {
  id?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onContextMenu?: (e: React.MouseEvent) => void;
  rows?: number;
}

function TextAreaInput({
  className,
  rows = 4,
  ...props
}: TextAreaInputProps) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-input-background outline-none",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 resize-vertical",
        className,
      )}
      {...props}
    />
  );
}

export { TextAreaInput, type TextAreaInputProps };