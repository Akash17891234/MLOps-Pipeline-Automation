import { DashboardHeader } from "@/components/dashboard-header"
import { ModelRegistry } from "@/components/model-registry"
import { ModelVersions } from "@/components/model-versions"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Model Registry</h1>
            <p className="text-muted-foreground text-lg">Manage and version your trained models</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Model
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ModelRegistry />
          </div>
          <div>
            <ModelVersions />
          </div>
        </div>
      </main>
    </div>
  )
}
