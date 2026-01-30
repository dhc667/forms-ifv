import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SortDirection = 'asc' | 'desc';
type SortColumn = 'id' | 'titulo' | 'elaborado' | 'revisado' | 'aprobado' | 'fecha';

type TableRow = {
  id: string;
  titulo: string;
  elaborado: string;
  revisado: string;
  aprobado: string;
  fecha: string;
};

export function TableView() {
  const [sortColumn, setSortColumn] = useState<SortColumn>('titulo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [hoveredColumn, setHoveredColumn] = useState<SortColumn | null>(null);

  const rawData: TableRow[] = Array(17).fill(null).map((_, idx) => ({
    id: 'RML-08-01',
    titulo: 'Validación del Peso del Tomate',
    elaborado: 'Alberto Moreno Pérez',
    revisado: idx === 0
      ? 'Rosalía Rodríguez Razck, Alejandra Serrano Jaime'
      : 'Rosalía Rodríguez Razck',
    aprobado: 'Dania Díaz Díaz',
    fecha: '11-08-2024'
  }));

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Start with ascending if clicking a new column
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...rawData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    const comparison = aValue.localeCompare(bValue);
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortArrow = ({ column }: { column: SortColumn }) => {
    const isActive = sortColumn === column;
    const isHovered = hoveredColumn === column;

    if (isActive) {
      return sortDirection === 'asc' ? (
        <ChevronUp size={16} className="ml-auto" />
      ) : (
        <ChevronDown size={16} className="ml-auto" />
      );
    }

    if (isHovered) {
      return <ChevronDown size={16} className="ml-auto opacity-40" />;
    }

    return null;
  };

  const getHeaderClassName = (column: SortColumn) => {
    const baseClass = "px-6 py-3 text-left text-sm cursor-pointer select-none transition-colors";
    const hoverClass = hoveredColumn === column ? "bg-muted" : "";
    return `${baseClass} ${hoverClass}`;
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="relative">

        {/* Table Container */}
        <div className="bg-background rounded-lg overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th
                    className={getHeaderClassName('id')}
                    onClick={() => handleSort('id')}
                    onMouseEnter={() => setHoveredColumn('id')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>ID</span>
                      <SortArrow column="id" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('titulo')}
                    onClick={() => handleSort('titulo')}
                    onMouseEnter={() => setHoveredColumn('titulo')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>Title</span>
                      <SortArrow column="titulo" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('elaborado')}
                    onClick={() => handleSort('elaborado')}
                    onMouseEnter={() => setHoveredColumn('elaborado')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>Created By</span>
                      <SortArrow column="elaborado" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('revisado')}
                    onClick={() => handleSort('revisado')}
                    onMouseEnter={() => setHoveredColumn('revisado')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>Reviewed By</span>
                      <SortArrow column="revisado" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('aprobado')}
                    onClick={() => handleSort('aprobado')}
                    onMouseEnter={() => setHoveredColumn('aprobado')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>Approved By</span>
                      <SortArrow column="aprobado" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('fecha')}
                    onClick={() => handleSort('fecha')}
                    onMouseEnter={() => setHoveredColumn('fecha')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>Date</span>
                      <SortArrow column="fecha" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.id}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{row.titulo}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.elaborado}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.revisado}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.aprobado}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}