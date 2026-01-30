import type { SelectionElement } from '@/lib/form-builder/types/selection';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SelectionRendererProps {
  element: SelectionElement;
  onRightClick: (element: SelectionElement, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function SelectionRenderer({ element, onRightClick, preview = false }: SelectionRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (preview) return; // Disable in preview mode
    e.preventDefault();
    onRightClick(element, e);
  };

  // Optional group title - render if exists
  const GroupTitle = element.title !== undefined && (
    <div className="mb-2">
      <Label className="text-current text-base font-medium">
        {element.title}
      </Label>
    </div>
  );

  if (element.type === 'single-selection') {
    // Radio Group
    return (
      <div className="space-y-2">
        {GroupTitle}
        <RadioGroup
          onContextMenu={handleContextMenu}
          disabled={preview}
          className={preview ? 'pointer-events-none' : ''}
        >
          {element.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} disabled={preview} />
              <Label htmlFor={option.id} className="text-current cursor-pointer">
                {option.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (element.type === 'multiple-selection') {
    // Checkbox Group
    return (
      <div className={`space-y-2 ${preview ? 'pointer-events-none' : ''}`} onContextMenu={handleContextMenu}>
        {GroupTitle}
        {element.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox id={option.id} disabled={preview} />
            <Label htmlFor={option.id} className="text-current cursor-pointer">
              {option.title}
            </Label>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
