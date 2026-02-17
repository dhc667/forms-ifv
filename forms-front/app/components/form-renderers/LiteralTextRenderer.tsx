import type { LiteralText } from '@/lib/form-builder/types/literal-text';

interface LiteralTextRendererProps {
  text: LiteralText;
  onRightClick: (text: LiteralText, event: React.MouseEvent) => void;
  readOnly?: boolean;
}

export function LiteralTextRenderer({
  text,
  onRightClick,
  readOnly = false,
}: LiteralTextRendererProps) {
  const handleClick = readOnly ? undefined : (e: React.MouseEvent) => onRightClick(text, e);

  return (
    <span
      className={readOnly ? 'inline' : 'hover:bg-muted/50 inline cursor-pointer rounded px-1'}
      onContextMenu={handleClick}
    >
      {text.content}
    </span>
  );
}
