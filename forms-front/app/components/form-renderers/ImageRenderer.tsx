import type { ImageElement, ImageValue } from '@/lib/form-builder/types/image';
import { ImagePlus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageRendererProps {
  element: ImageElement;
  onRightClick: (element: ImageElement, event: React.MouseEvent) => void;
  readOnly?: boolean;
  value?: ImageValue;
}

export function ImageRenderer({
  element,
  onRightClick,
  readOnly = false,
  value,
}: ImageRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (readOnly) return;
    e.preventDefault();
    onRightClick(element, e);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`space-y-2 ${readOnly ? 'pointer-events-none' : ''}`}
    >
      <div className="mb-2">
        <Label className="text-base font-medium text-current">{element.title}</Label>
      </div>
      <div className="border-muted-foreground/25 flex h-[150px] items-center justify-center overflow-hidden rounded-lg border-2 border-dashed">
        {value ? (
          <img src={value} alt={element.title} className="max-h-full max-w-full object-contain" />
        ) : (
          <ImagePlus className="text-muted-foreground/50 h-12 w-12" />
        )}
      </div>
    </div>
  );
}
