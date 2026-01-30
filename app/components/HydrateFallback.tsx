import { useTranslation } from 'react-i18next';

export function HydrateFallback() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground text-sm">{t('loading')}</p>
      </div>
    </div>
  );
}