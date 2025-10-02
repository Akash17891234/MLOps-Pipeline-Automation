import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle, MoreVertical, ExternalLink } from "lucide-react"

export function DeploymentsList() {
  const deployments = [
    {
      id: "dep-001",
      name: "customer-churn-v2.1",
      model: "customer-churn-predictor",
      version: "v2.1.0",
      status: "active",
      environment: "production",
      endpoint: "https://api.mlops.dev/predict/churn",
      uptime: "99.9%",
      requests: "1.2M",
      avgLatency: "45ms",
      errorRate: "0.01%",
      deployedAt: "2 hours ago",
    },
    {
      id: "dep-002",
      name: "price-prediction-v1.5",
      model: "price-prediction-model",
      version: "v1.5.2",
      status: "active",
      environment: "production",
      endpoint: "https://api.mlops.dev/predict/price",
      uptime: "99.8%",
      requests: "856K",
      avgLatency: "38ms",
      errorRate: "0.02%",
      deployedAt: "1 day ago",
    },
    {
      id: "dep-003",
      name: "sentiment-analysis-v3.0",
      model: "sentiment-analyzer",
      version: "v3.0.1",
      status: "deploying",
      environment: "staging",
      endpoint: "https://staging.mlops.dev/predict/sentiment",
      uptime: "-",
      requests: "-",
      avgLatency: "-",
      errorRate: "-",
      deployedAt: "15 minutes ago",
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
        <h3 className="text-lg font-semibold text-foreground mb-1">Active Deployments</h3>
        <p className="text-sm text-muted-foreground">Monitor and manage your deployed models</p>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="p-5 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(deployment.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-semibold text-foreground">{deployment.name}</h4>
                    <Badge className={`text-xs ${getStatusColor(deployment.status)}`}>{deployment.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {deployment.environment}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {deployment.model} • {deployment.version}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <code className="px-2 py-1 bg-secondary rounded text-xs">{deployment.endpoint}</code>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                <p className="text-sm font-medium text-foreground">{deployment.uptime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Requests</p>
                <p className="text-sm font-medium text-foreground">{deployment.requests}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Avg Latency</p>
                <p className="text-sm font-medium text-foreground">{deployment.avgLatency}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Error Rate</p>
                <p className="text-sm font-medium text-foreground">{deployment.errorRate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Deployed</p>
                <p className="text-sm font-medium text-foreground">{deployment.deployedAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
