import { useEffect, useRef } from 'react';

interface SimpleContextMenuProps {
  element: any; // Will be the most specific element
  position: { x: number; y: number };
  onClose: () => void;
}

export function SimpleContextMenu({ element, position, onClose }: SimpleContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Adjust position to stay within screen bounds
  const adjustedPosition = (() => {
    if (!menuRef.current) return position;

    const menuRect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let adjustedX = position.x;
    let adjustedY = position.y;

    // Check right edge
    if (position.x + menuRect.width > viewportWidth) {
      adjustedX = viewportWidth - menuRect.width - 10; // 10px padding
    }

    // Check bottom edge
    if (position.y + menuRect.height > viewportHeight) {
      adjustedY = viewportHeight - menuRect.height - 10; // 10px padding
    }

    // Ensure not negative
    adjustedX = Math.max(10, adjustedX);
    adjustedY = Math.max(10, adjustedY);

    return { x: adjustedX, y: adjustedY };
  })();

  return (
    <div
      ref={menuRef}
      className="context-menu fixed bg-background border rounded-lg shadow-lg p-4 z-50 min-w-[300px]"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-sm">Element Type: {element.type}</h4>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground text-sm"
        >
          ✕
        </button>
      </div>
      <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-60">
        {JSON.stringify(element, null, 2)}
      </pre>
    </div>
  );
}