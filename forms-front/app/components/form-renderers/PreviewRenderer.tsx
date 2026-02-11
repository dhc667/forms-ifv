import React from 'react';
import { ElementRenderer } from '@/components/form-renderers/ElementRenderer';
import type { QuestionComponent } from '@/lib/form-builder/types/question';

interface PreviewRendererProps {
  element: QuestionComponent;
  className?: string;
}

export function PreviewRenderer({ element, className }: PreviewRendererProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <ElementRenderer
        element={element}
        preview={true}
        onRightClick={() => {}} // Disabled in preview
      />
    </div>
  );
}