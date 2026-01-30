import { Search, Filter } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { Input } from '@/components/ui/input';

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L12 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-semibold">IFV</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/schemas"
            className={`${isActive('/schemas') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            Schemas
          </Link>
          <Link
            to="/create-schema"
            className={`${isActive('/create-schema') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            Create Schema
          </Link>
          <Link
            to="/forms"
            className={`${isActive('/forms') || isActive('/') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            Forms
          </Link>
          <Link
            to="/my-forms"
            className={`${isActive('/my-forms') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            My Forms
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-primary-foreground/20 rounded px-3 py-1.5 flex items-center gap-2 w-48">
          <Search size={18} className="text-primary-foreground" />
          <Input
            type="text"
            placeholder=""
            className="bg-transparent border-none outline-none text-primary-foreground placeholder-primary-foreground/60 w-full h-auto p-0 focus-visible:ring-0"
          />
        </div>
        <button className="bg-primary-foreground/20 rounded p-1.5 hover:bg-primary-foreground/30 transition-colors">
          <Filter size={18} className="text-primary-foreground" />
        </button>
        <ThemeSwitcher />
      </div>
    </header>
  );
}