import type { SelectionElement, SelectionValue } from '@/lib/form-builder/types/selection';
import type { FormComponentValue } from '@/lib/form-builder/types/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SelectionRendererProps {
  element: SelectionElement;
  onRightClick: (element: SelectionElement, event: React.MouseEvent) => void;
  readOnly?: boolean;
  value?: SelectionValue;
  onValueChange?: (id: string, value: FormComponentValue) => void;
}

export function SelectionRenderer({
  element,
  onRightClick,
  readOnly = false,
  value,
  onValueChange,
}: SelectionRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (readOnly) return; // Disable in read-only mode
    e.preventDefault();
    onRightClick(element, e);
  };

  // Optional group title - render if exists
  const GroupTitle = element.title !== undefined && (
    <div className="mb-2">
      <Label className="text-base font-medium text-current">{element.title}</Label>
    </div>
  );

  if (element.type === 'single-selection') {
    // Radio Group
    const selectedValue = typeof value === 'string' ? value : undefined;
    return (
      <div className="space-y-2">
        {GroupTitle}
        <RadioGroup
          onContextMenu={handleContextMenu}
          disabled={readOnly}
          className={readOnly ? 'pointer-events-none' : ''}
          value={selectedValue}
          onValueChange={(newValue) => {
            if (!readOnly && onValueChange) {
              onValueChange(element.id, newValue);
            }
          }}
        >
          {element.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} disabled={readOnly} />
              <Label htmlFor={option.id} className="cursor-pointer text-current">
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
    const selectedValues = Array.isArray(value) ? value : [];
    return (
      <div
        className={`space-y-2 ${readOnly ? 'pointer-events-none' : ''}`}
        onContextMenu={handleContextMenu}
      >
        {GroupTitle}
        {element.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              disabled={readOnly}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={(checked) => {
                if (!readOnly && onValueChange) {
                  const newValues = checked
                    ? [...selectedValues, option.id]
                    : selectedValues.filter((id) => id !== option.id);
                  onValueChange(element.id, newValues);
                }
              }}
            />
            <Label htmlFor={option.id} className="cursor-pointer text-current">
              {option.title}
            </Label>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
