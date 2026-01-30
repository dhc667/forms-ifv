import { Link, useLocation } from 'react-router';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { SearchAndFilters } from '@/components/ui/search-and-filters';
import { useTranslation } from 'react-i18next';

export function Header() {
  const location = useLocation();
  const { t } = useTranslation('navigation');

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <img src="/assets/IFVLogo.svg" alt="IFV Logo" className="w-6 h-6" />
          <span className="text-lg font-semibold">{t('ifv')}</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            to="/schemas"
            className={`${isActive('/schemas') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            {t('schemas')}
          </Link>
          <Link
            to="/create-schema"
            className={`${isActive('/create-schema') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            {t('createSchema')}
          </Link>
          <Link
            to="/"
            className={`${isActive('/') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            {t('forms')}
          </Link>
          <Link
            to="/my-forms"
            className={`${isActive('/my-forms') ? 'text-primary-foreground border-b-2 border-primary-foreground pb-1' : 'text-primary-foreground/90'} hover:text-primary-foreground transition-colors`}
          >
            {t('myForms')}
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <SearchAndFilters />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}