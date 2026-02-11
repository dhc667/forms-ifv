import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQueryState] = useState(searchParams.get('q') || '');

  // Sync query with URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query) {
      setQueryState(urlQuery);
    }
  }, [searchParams, query]);

  const setQuery = (newQuery: string) => {
    setQueryState(newQuery);
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    } else {
      // Remove q param if empty
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}