import type { QuestionComponent } from '@/lib/form-builder/types/question';
import { TextRenderer } from './TextRenderer';
import { SelectionRenderer } from './SelectionRenderer';

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
      return (
        <div onContextMenu={handleContextMenu} className="inline-block">
          {/* Table content - future implementation */}
          Table Element
        </div>
      );
    case 'multiple-selection':
    case 'single-selection':
      return <SelectionRenderer element={element as any} onRightClick={onRightClick} preview={preview} />;
    case 'image':
      return (
        <div onContextMenu={handleContextMenu} className="inline-block">
          {/* Image content - future implementation */}
          Image Element
        </div>
      );
    default:
      return <div onContextMenu={handleContextMenu}>Unknown element type</div>;
  }
}