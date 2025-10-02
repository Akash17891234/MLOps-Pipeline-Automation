import { DashboardHeader } from "@/components/dashboard-header"
import { ExperimentComparison } from "@/components/experiment-comparison"
import { ExperimentFilters } from "@/components/experiment-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Experiments</h1>
            <p className="text-muted-foreground text-lg">Track, compare, and analyze your ML experiments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Experiment
          </Button>
        </div>

        <ExperimentFilters />
        <ExperimentComparison />
      </main>
    </div>
  )
}
