import * as React from 'react';
import type { TableElement, TableCell, TableValue } from '@/lib/form-builder/types/table';
import type { Input } from '@/lib/form-builder/types/inputs';
import type { LiteralText } from '@/lib/form-builder/types/literal-text';
import type { FormComponentValue } from '@/lib/form-builder/types/form';
import { InputRenderer } from './InputRenderer';
import { LiteralTextRenderer } from './LiteralTextRenderer';
import { Table, TableBody, TableCell as TableCellUI, TableRow } from '@/components/ui/table';
import { cn } from '@/utils';

interface TableRendererProps {
  element: TableElement;
  onRightClick: (element: TableCell | TableElement, event: React.MouseEvent) => void;
  readOnly?: boolean;
  values?: Record<string, FormComponentValue>;
}

export function TableRenderer({
  element,
  onRightClick,
  readOnly = false,
  values = {},
}: TableRendererProps) {
  // Table values are stored as Record<string, InputValue> keyed by cell ID
  const tableValues = values[element.id] as TableValue | undefined;
  const isLiteralTextCell = (cell: TableCell): cell is LiteralText => cell.type === 'embedded-text';

  const getCellClassName = (cell: TableCell) => {
    const baseClasses = 'min-w-[120px]';

    if (isLiteralTextCell(cell)) {
      // Literal text cells: secondary background for better contrast, dark foreground text, left border
      return cn(
        baseClasses,
        'bg-secondary/20 text-foreground font-medium border-l-2 border-l-foreground/40'
      );
    } else {
      // Input cells: normal background, hover state
      return cn(baseClasses, 'bg-background hover:bg-muted/20');
    }
  };

  const handleTableContextMenu = (e: React.MouseEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    onRightClick(element, e);
  };

  const handleTableCellContextMenu = (cell: TableCell, event: React.MouseEvent) => {
    if (readOnly) return;
    event.preventDefault();
    event.stopPropagation();
    handleCellRightClick(cell, event);
  };

  const handleCellRightClick = (cell: TableCell, event: React.MouseEvent) => {
    if (readOnly) return;
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
          readOnly={readOnly}
        />
      );
    } else {
      return (
        <InputRenderer
          input={cell as Input}
          onRightClick={(input, event) => handleCellRightClick(cell, event)}
          readOnly={readOnly}
          value={tableValues?.[cell.id]}
        />
      );
    }
  };

  return (
    <div
      onContextMenu={handleTableContextMenu}
      className={cn(
        'inline-block overflow-hidden rounded-md border',
        readOnly && 'pointer-events-none'
      )}
    >
      <Table className="border-0">
        <TableBody>
          {element.rows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} className="border-border border-b">
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
