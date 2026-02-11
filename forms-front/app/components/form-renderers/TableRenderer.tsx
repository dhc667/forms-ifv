import * as React from "react";
import type { TableElement, TableCell } from '@/lib/form-builder/types/table';
import type { Input } from '@/lib/form-builder/types/inputs';
import type { LiteralText } from '@/lib/form-builder/types/literal-text';
import { InputRenderer } from './InputRenderer';
import { LiteralTextRenderer } from './LiteralTextRenderer';
import { Table, TableBody, TableCell as TableCellUI, TableRow } from '@/components/ui/table';
import { cn } from '@/utils';

interface TableRendererProps {
  element: TableElement;
  onRightClick: (element: TableCell | TableElement, event: React.MouseEvent) => void;
  preview?: boolean;
}

export function TableRenderer({ element, onRightClick, preview = false }: TableRendererProps) {
  const isLiteralTextCell = (cell: TableCell): cell is LiteralText =>
    cell.type === 'embedded-text';

  const getCellClassName = (cell: TableCell) => {
    const baseClasses = "min-w-[120px]";
    
    if (isLiteralTextCell(cell)) {
      // Literal text cells: secondary background for better contrast, dark foreground text, left border
      return cn(
        baseClasses,
        "bg-secondary/20 text-foreground font-medium border-l-2 border-l-foreground/40"
      );
    } else {
      // Input cells: normal background, hover state
      return cn(
        baseClasses,
        "bg-background hover:bg-muted/20"
      );
    }
  };

  const handleTableContextMenu = (e: React.MouseEvent) => {
    if (preview) return;
    e.preventDefault();
    e.stopPropagation();
    onRightClick(element, e);
  };

  const handleTableCellContextMenu = (cell: TableCell, event: React.MouseEvent) => {
    if (preview) return;
    event.preventDefault();
    event.stopPropagation();
    handleCellRightClick(cell, event);
  };

  const handleCellRightClick = (cell: TableCell, event: React.MouseEvent) => {
    if (preview) return;
    event.preventDefault();
    event.stopPropagation();
    onRightClick(cell, event);
  };

  const renderCell = (cell: TableCell) => {
    if (isLiteralTextCell(cell)) {
      return (
        <LiteralTextRenderer
          text={cell}
          onRightClick={(text, event) => handleCellRightClick(cell, event)}
          preview={preview}
        />
      );
    } else {
      return (
        <InputRenderer
          input={cell as Input}
          onRightClick={(input, event) => handleCellRightClick(cell, event)}
          preview={preview}
        />
      );
    }
  };

  return (
    <div
      onContextMenu={handleTableContextMenu}
      className={cn(
        "inline-block border rounded-md overflow-hidden",
        preview && "pointer-events-none"
      )}
    >
      <Table className="border-0">
        <TableBody>
          {element.rows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} className="border-b border-border">
              {row.map((cell, cellIndex) => (
                <TableCellUI
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={getCellClassName(cell)}
                  onContextMenu={(e) => handleTableCellContextMenu(cell, e)}
                >
                  {renderCell(cell)}
                </TableCellUI>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
