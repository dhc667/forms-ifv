import type { ImageElement } from '@/lib/form-builder/types/image';
import { ImagePlus } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageRendererProps {
  element: ImageElement;
  onRightClick: (element: ImageElement, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function ImageRenderer({ element, onRightClick, preview = false }: ImageRendererProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    if (preview) return;
    e.preventDefault();
    onRightClick(element, e);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={`space-y-2 ${preview ? 'pointer-events-none' : ''}`}
    >
      <div className="mb-2">
        <Label className="text-current text-base font-medium">{element.title}</Label>
      </div>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-[150px] flex items-center justify-center">
        <ImagePlus className="h-12 w-12 text-muted-foreground/50" />
      </div>
    </div>
  );
}
