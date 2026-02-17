import type { QuestionComponent } from '@/lib/form-builder/types/question';
import type { TableCell, TableElement } from '@/lib/form-builder/types/table';
import type { FormComponentValue } from '@/lib/form-builder/types/form';
import type { SelectionValue } from '@/lib/form-builder/types/selection';
import { TextRenderer } from './TextRenderer';
import { SelectionRenderer } from './SelectionRenderer';
import { TableRenderer } from './TableRenderer';
import { ImageRenderer } from './ImageRenderer';

interface ElementRendererProps {
  element: QuestionComponent;
  onRightClick: (element: any, event: React.MouseEvent) => void;
  readOnly?: boolean;
  values?: Record<string, FormComponentValue>;
  onValueChange?: (id: string, value: FormComponentValue) => void;
}

export function ElementRenderer({
  element,
  onRightClick,
  readOnly = false,
  values = {},
  onValueChange,
}: ElementRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (readOnly) return; // Disable in read-only mode
    e.preventDefault();
    onRightClick(element, e);
  };

  switch (element.type) {
    case 'text':
      return (
        <TextRenderer
          element={element as any}
          onRightClick={onRightClick}
          readOnly={readOnly}
          values={values}
        />
      );
    case 'table':
      return (
        <TableRenderer
          element={element as any}
          onRightClick={onRightClick}
          readOnly={readOnly}
          values={values}
        />
      );
    case 'multiple-selection':
    case 'single-selection':
      return (
        <SelectionRenderer
          element={element as any}
          onRightClick={onRightClick}
          readOnly={readOnly}
          value={values[element.id] as SelectionValue | undefined}
          onValueChange={onValueChange}
        />
      );
    case 'image':
      return (
        <ImageRenderer
          element={element}
          onRightClick={onRightClick}
          readOnly={readOnly}
          value={values[element.id] as string | undefined}
        />
      );
    default:
      return <div onContextMenu={handleContextMenu}>Unknown element type</div>;
  }
}
