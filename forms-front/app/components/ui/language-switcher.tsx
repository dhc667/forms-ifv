import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/utils';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);

    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    window.history.replaceState({}, '', url);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded hover:bg-muted/50"
        aria-label="Select language"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <Globe size={16} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 z-20 mt-1 bg-background border border-border rounded shadow-lg py-1 min-w-32">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted/50 transition-colors",
                  i18n.language === language.code && "bg-primary/10 text-primary"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}