import { DashboardHeader } from "@/components/dashboard-header"
import { DeploymentsList } from "@/components/deployments-list"
import { DeploymentMetrics } from "@/components/deployment-metrics"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export default function DeploymentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Deployments</h1>
            <p className="text-muted-foreground text-lg">Monitor and manage model deployments</p>
          </div>
          <Button>
            <Rocket className="h-4 w-4 mr-2" />
            New Deployment
          </Button>
        </div>

        <DeploymentMetrics />
        <div className="mt-6">
          <DeploymentsList />
        </div>
      </main>
    </div>
  )
}
