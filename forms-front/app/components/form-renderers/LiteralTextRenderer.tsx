import type { LiteralText } from '@/lib/form-builder/types/literal-text';

interface LiteralTextRendererProps {
  text: LiteralText;
  onRightClick: (text: LiteralText, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function LiteralTextRenderer({ text, onRightClick, preview = false }: LiteralTextRendererProps) {
  const handleClick = preview ? undefined : (e: React.MouseEvent) => onRightClick(text, e);

  return (
    <span
      className={preview ? 'inline' : 'cursor-pointer hover:bg-muted/50 rounded px-1 inline'}
      onContextMenu={handleClick}
    >
      {text.content}
    </span>
  );
}