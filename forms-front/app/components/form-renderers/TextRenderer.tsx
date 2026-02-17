import React from 'react';
import type { TextElement } from '@/lib/form-builder/types/text';
import type { TextValue } from '@/lib/form-builder/types/text';
import type { FormComponentValue } from '@/lib/form-builder/types/form';
import { InputRenderer } from './InputRenderer';
import { LiteralTextRenderer } from './LiteralTextRenderer';

interface TextRendererProps {
  element: TextElement;
  onRightClick: (element: any, event: React.MouseEvent) => void;
  readOnly?: boolean;
  values?: Record<string, FormComponentValue>;
}

export function TextRenderer({
  element,
  onRightClick,
  readOnly = false,
  values = {},
}: TextRendererProps) {
  const handleComponentRightClick = (component: any, event: React.MouseEvent) => {
    if (readOnly) return; // Disable in read-only mode
    event.stopPropagation();
    event.preventDefault();
    onRightClick(component, event);
  };

  return (
    <div className="text-element flex flex-wrap items-center gap-1">
      {element.components.map((component) => (
        <React.Fragment key={component.id || 'temp-id'}>
          {component.type === 'embedded-text' ? (
            <LiteralTextRenderer
              text={component}
              onRightClick={handleComponentRightClick}
              readOnly={readOnly}
            />
          ) : (
            <InputRenderer
              input={component}
              onRightClick={handleComponentRightClick}
              readOnly={readOnly}
              value={values[component.id] as TextValue | undefined}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
