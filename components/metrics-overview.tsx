import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, CheckCircle2 } from "lucide-react"

export function MetricsOverview() {
  const metrics = [
    {
      label: "Active Experiments",
      value: "12",
      change: "+3",
      trend: "up",
      icon: Activity,
    },
    {
      label: "Model Accuracy",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      label: "Deployments",
      value: "8",
      change: "+2",
      trend: "up",
      icon: CheckCircle2,
    },
    {
      label: "Avg Training Time",
      value: "12.4m",
      change: "-1.2m",
      trend: "down",
      icon: TrendingDown,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"

        return (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-success" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-success" />
                  )}
                  <span className="text-xs text-success font-medium">{metric.change}</span>
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
