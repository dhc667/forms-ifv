import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useSearch } from '@/context/SearchContext';

export function SearchAndFilters({ showFilters = true }: { showFilters?: boolean }) {
  const { t } = useTranslation('navigation');
  const { query, setQuery, clearSearch } = useSearch();

  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary-foreground/20 rounded px-3 py-1.5 flex items-center gap-2 w-48">
        <Search size={18} className="text-primary-foreground" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-primary-foreground placeholder-primary-foreground/60 w-full h-auto p-0 focus-visible:ring-0"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="h-4 w-4 p-0 hover:bg-primary-foreground/20 text-primary-foreground/60 hover:text-primary-foreground"
          >
            <X size={14} />
          </Button>
        )}
      </div>

      {showFilters && (
        <Button
          variant="outline"
          size="sm"
          className="bg-primary-foreground/20 border-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground"
        >
          <Filter size={18} />
        </Button>
      )}
    </div>
  );
}
