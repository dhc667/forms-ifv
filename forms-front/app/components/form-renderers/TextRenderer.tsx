import React from 'react';
import type { TextElement } from '@/lib/form-builder/types/text';
import { InputRenderer } from './InputRenderer';
import { LiteralTextRenderer } from './LiteralTextRenderer';

interface TextRendererProps {
  element: TextElement;
  onRightClick: (element: any, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function TextRenderer({ element, onRightClick, preview = false }: TextRendererProps) {
  const handleComponentRightClick = (component: any, event: React.MouseEvent) => {
    if (preview) return; // Disable in preview mode
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
              preview={preview}
            />
          ) : (
            <InputRenderer
              input={component}
              onRightClick={handleComponentRightClick}
              preview={preview}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}