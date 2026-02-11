import type { QuestionComponent } from '@/lib/form-builder/types/question';
import type { TableCell, TableElement } from '@/lib/form-builder/types/table';
import { TextRenderer } from './TextRenderer';
import { SelectionRenderer } from './SelectionRenderer';
import { TableRenderer } from './TableRenderer';
import { ImageRenderer } from './ImageRenderer';

interface ElementRendererProps {
  element: QuestionComponent;
  onRightClick: (element: any, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function ElementRenderer({ element, onRightClick, preview = false }: ElementRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (preview) return; // Disable in preview mode
    e.preventDefault();
    onRightClick(element, e);
  };

  switch (element.type) {
    case 'text':
      return <TextRenderer element={element as any} onRightClick={onRightClick} preview={preview} />;
    case 'table':
      return <TableRenderer element={element as any} onRightClick={onRightClick} preview={preview} />;
    case 'multiple-selection':
    case 'single-selection':
      return <SelectionRenderer element={element as any} onRightClick={onRightClick} preview={preview} />;
    case 'image':
      return <ImageRenderer element={element} onRightClick={onRightClick} preview={preview} />;
    default:
      return <div onContextMenu={handleContextMenu}>Unknown element type</div>;
  }
}