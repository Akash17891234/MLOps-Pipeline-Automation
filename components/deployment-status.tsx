import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function DeploymentStatus() {
  const deployments = [
    {
      name: "customer-churn-v2.1",
      status: "active",
      environment: "production",
      uptime: "99.9%",
      requests: "1.2M",
    },
    {
      name: "price-prediction-v1.5",
      status: "active",
      environment: "production",
      uptime: "99.8%",
      requests: "856K",
    },
    {
      name: "sentiment-analysis-v3.0",
      status: "deploying",
      environment: "staging",
      uptime: "-",
      requests: "-",
    },
    {
      name: "fraud-detection-v1.2",
      status: "failed",
      environment: "staging",
      uptime: "-",
      requests: "-",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-success" />
      case "deploying":
        return <Clock className="h-4 w-4 text-warning" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success/20"
      case "deploying":
        return "bg-warning/10 text-warning border-warning/20"
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Deployment Status</h3>
        <p className="text-sm text-muted-foreground">Active model deployments</p>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div
            key={deployment.name}
            className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 flex-1">
              {getStatusIcon(deployment.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{deployment.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {deployment.environment}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(deployment.status)}`}>{deployment.status}</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-6 text-right">
              <div>
                <p className="text-xs text-muted-foreground">Uptime</p>
                <p className="text-sm font-medium text-foreground">{deployment.uptime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requests</p>
                <p className="text-sm font-medium text-foreground">{deployment.requests}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
