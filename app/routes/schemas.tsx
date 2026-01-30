import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function SchemasPage() {
  const { t } = useTranslation('schemas');

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={true} />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('comingSoon')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
