import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DebugPage {
  name: string;
  description: string;
  route: string;
}

const debugPages: DebugPage[] = [
  {
    name: 'Components Test',
    description: 'Test all UI components with IFV blue theme',
    route: '/debug/components-test',
  },
];

const mainPages: DebugPage[] = [
  {
    name: 'Forms',
    description: 'Forms listing page with table view',
    route: '/forms',
  },
  {
    name: 'Schemas',
    description: 'Schema management page',
    route: '/schemas',
  },
  {
    name: 'Create Schema',
    description: 'Schema creation page with sidebar and question cards',
    route: '/create-schema',
  },
  {
    name: 'My Forms',
    description: 'Personal forms page',
    route: '/my-forms',
  },
];

export default function DebugIndex() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-foreground mb-2 text-3xl font-bold">Debug Pages</h1>
          <p className="text-muted-foreground">Development tools and component showcases</p>
        </div>

        <div>
          <h2 className="text-foreground mb-4 text-xl font-semibold">Main Application Pages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mainPages.map((page) => (
              <Card key={page.route} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{page.name}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={page.route}
                    className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    View Page
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-foreground mb-4 text-xl font-semibold">Debug Tools</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {debugPages.map((page) => (
              <Card key={page.route} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{page.name}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={page.route}
                    className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    View Page
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
