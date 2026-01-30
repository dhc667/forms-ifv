import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SchemasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Schemas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Schema management view - Coming soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}