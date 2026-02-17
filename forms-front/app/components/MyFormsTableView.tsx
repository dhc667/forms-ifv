import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Eye, Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useSearch } from '@/context/SearchContext';
import { generateMyFormsData } from '@/lib/debug/data-gen';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Generate data once outside the component to avoid regeneration on every render
const GENERATED_DATA = generateMyFormsData(25);

type SortDirection = 'asc' | 'desc';
type SortColumn = 'id' | 'titulo' | 'estado' | 'fechaEnvio' | 'revisadoPor' | 'aprobadoPor';

type TableRow = {
  id: string;
  titulo: string;
  estado: 'draft' | 'pending' | 'approved';
  fechaEnvio?: string;
  revisadoPor?: string;
  aprobadoPor?: string;
};

export function MyFormsTableView() {
  const { t } = useTranslation('my-forms');
  const { query } = useSearch();
  const [sortColumn, setSortColumn] = useState<SortColumn>('titulo');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [hoveredColumn, setHoveredColumn] = useState<SortColumn | null>(null);

  const rawData: TableRow[] = GENERATED_DATA;

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    if (!query.trim()) return rawData;

    return rawData.filter((row) =>
      Object.values(row).some((value) => value && value.toLowerCase().includes(query.toLowerCase()))
    );
  }, [rawData, query]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn] ?? '';
      const bValue = b[sortColumn] ?? '';

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
    const baseClass = 'px-6 py-3 text-left text-sm cursor-pointer select-none transition-colors';
    const hoverClass = hoveredColumn === column ? 'bg-muted' : '';
    return `${baseClass} ${hoverClass}`;
  };

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado) {
      case 'draft':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'approved':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-primary min-h-screen p-8">
        <div className="relative">
          {/* Search Results Count */}
          {query && (
            <div className="text-primary-foreground/80 mb-4 text-sm">
              {t('results', { count: sortedData.length })}
            </div>
          )}

          {/* Table Container */}
          <div className="bg-background overflow-hidden rounded-lg shadow-lg">
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
                    <th
                      className={getHeaderClassName('fechaEnvio')}
                      onClick={() => handleSort('fechaEnvio')}
                      onMouseEnter={() => setHoveredColumn('fechaEnvio')}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      <div className="flex items-center">
                        <span>{t('table.fechaEnvio')}</span>
                        <SortArrow column="fechaEnvio" />
                      </div>
                    </th>
                    <th
                      className={getHeaderClassName('revisadoPor')}
                      onClick={() => handleSort('revisadoPor')}
                      onMouseEnter={() => setHoveredColumn('revisadoPor')}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      <div className="flex items-center">
                        <span>{t('table.revisadoPor')}</span>
                        <SortArrow column="revisadoPor" />
                      </div>
                    </th>
                    <th
                      className={getHeaderClassName('aprobadoPor')}
                      onClick={() => handleSort('aprobadoPor')}
                      onMouseEnter={() => setHoveredColumn('aprobadoPor')}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      <div className="flex items-center">
                        <span>{t('table.aprobadoPor')}</span>
                        <SortArrow column="aprobadoPor" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm">{t('table.acciones')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row, idx) => (
                    <tr key={idx} className="border-border hover:bg-muted/50 border-b">
                      <td className="text-muted-foreground px-6 py-3 text-sm">{row.id}</td>
                      <td className="text-foreground px-6 py-3 text-sm">{row.titulo}</td>
                      <td className="px-6 py-3 text-sm">
                        <Badge variant={getEstadoBadgeVariant(row.estado)}>
                          {t(`estados.${row.estado}`)}
                        </Badge>
                      </td>
                      <td className="text-muted-foreground px-6 py-3 text-sm">
                        {row.fechaEnvio || '-'}
                      </td>
                      <td className="text-muted-foreground px-6 py-3 text-sm">
                        {row.revisadoPor || '-'}
                      </td>
                      <td className="text-muted-foreground px-6 py-3 text-sm">
                        {row.aprobadoPor || '-'}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link to={`/forms/${row.id}?mode=view`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('actions.view')}</p>
                            </TooltipContent>
                          </Tooltip>
                          {row.estado === 'draft' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link to={`/forms/${row.id}?mode=edit`}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('actions.edit')}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
