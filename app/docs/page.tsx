import { DashboardHeader } from "@/components/dashboard-header"
import { DocumentationNav } from "@/components/documentation-nav"
import { DocumentationContent } from "@/components/documentation-content"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Documentation</h1>
          <p className="text-muted-foreground text-lg">Complete guide to MLOps pipeline automation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DocumentationNav />
          </div>
          <div className="lg:col-span-3">
            <DocumentationContent />
          </div>
        </div>
      </main>
    </div>
  )
}
