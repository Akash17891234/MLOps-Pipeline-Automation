import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { ExperimentsList } from "@/components/experiments-list"
import { DeploymentStatus } from "@/components/deployment-status"
import { ModelPerformance } from "@/components/model-performance"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">MLOps Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor your machine learning pipelines, experiments, and deployments
          </p>
        </div>

        <MetricsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ModelPerformance />
          <DeploymentStatus />
        </div>

        <div className="mt-6">
          <ExperimentsList />
        </div>
      </main>
    </div>
  )
}
