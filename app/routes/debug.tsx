import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DebugPage {
  name: string
  description: string
  route: string
}

const debugPages: DebugPage[] = [
  {
    name: "Components Test",
    description: "Test all UI components with IFV blue theme",
    route: "/debug/components-test",
  },
]

const mainPages: DebugPage[] = [
  {
    name: "Forms",
    description: "Forms listing page with table view",
    route: "/forms",
  },
  {
    name: "Schemas",
    description: "Schema management page",
    route: "/schemas",
  },
  {
    name: "Create Schema",
    description: "Schema creation page with sidebar and question cards",
    route: "/create-schema",
  },
  {
    name: "My Forms",
    description: "Personal forms page",
    route: "/my-forms",
  },
]

export default function DebugIndex() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Debug Pages</h1>
          <p className="text-muted-foreground">Development tools and component showcases</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Main Application Pages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mainPages.map((page) => (
              <Card key={page.route} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{page.name}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={page.route}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  >
                    View Page
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Debug Tools</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {debugPages.map((page) => (
              <Card key={page.route} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{page.name}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={page.route}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
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
  )
}