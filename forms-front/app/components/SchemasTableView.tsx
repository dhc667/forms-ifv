import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearch } from '@/context/SearchContext';
import { generateSchemasData } from '@/lib/debug/data-gen';
import { Badge } from '@/components/ui/badge';

// Generate data once outside the component to avoid regeneration on every render
const GENERATED_DATA = generateSchemasData(25);

type SortDirection = 'asc' | 'desc';
type SortColumn = 'id' | 'titulo' | 'version' | 'creadoPor' | 'fechaCreacion' | 'estado';

type TableRow = {
  id: string;
  titulo: string;
  version: string;
  creadoPor: string;
  fechaCreacion: string;
  estado: 'activo' | 'borrador' | 'archivado';
};

export function SchemasTableView() {
  const { t } = useTranslation('schemas');
  const { query } = useSearch();
  const [sortColumn, setSortColumn] = useState<SortColumn>('titulo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [hoveredColumn, setHoveredColumn] = useState<SortColumn | null>(null);

  const rawData: TableRow[] = GENERATED_DATA;

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

  const filteredData = useMemo(() => {
    if (!query.trim()) return rawData;
    
    return rawData.filter(row =>
      Object.values(row).some(value =>
        value.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [rawData, query]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      const comparison = aValue.localeCompare(bValue);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

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

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'default';
      case 'borrador':
        return 'secondary';
      case 'archivado':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="relative">

        {/* Search Results Count */}
        {query && (
          <div className="mb-4 text-sm text-primary-foreground/80">
            {t('results', { count: sortedData.length })}
          </div>
        )}

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
                      <span>{t('table.id')}</span>
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
                      <span>{t('table.titulo')}</span>
                      <SortArrow column="titulo" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('version')}
                    onClick={() => handleSort('version')}
                    onMouseEnter={() => setHoveredColumn('version')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>{t('table.version')}</span>
                      <SortArrow column="version" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('creadoPor')}
                    onClick={() => handleSort('creadoPor')}
                    onMouseEnter={() => setHoveredColumn('creadoPor')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>{t('table.creadoPor')}</span>
                      <SortArrow column="creadoPor" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('fechaCreacion')}
                    onClick={() => handleSort('fechaCreacion')}
                    onMouseEnter={() => setHoveredColumn('fechaCreacion')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>{t('table.fechaCreacion')}</span>
                      <SortArrow column="fechaCreacion" />
                    </div>
                  </th>
                  <th
                    className={getHeaderClassName('estado')}
                    onClick={() => handleSort('estado')}
                    onMouseEnter={() => setHoveredColumn('estado')}
                    onMouseLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center">
                      <span>{t('table.estado')}</span>
                      <SortArrow column="estado" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.id}</td>
                    <td className="px-6 py-3 text-sm text-foreground">{row.titulo}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.version}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.creadoPor}</td>
                    <td className="px-6 py-3 text-sm text-muted-foreground">{row.fechaCreacion}</td>
                    <td className="px-6 py-3 text-sm">
                      <Badge variant={getEstadoBadgeVariant(row.estado)}>
                        {t(`estados.${row.estado}`)}
                      </Badge>
                    </td>
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