import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitBranch } from "lucide-react"

export function ExperimentsList() {
  const experiments = [
    {
      id: "exp-001",
      name: "XGBoost Hyperparameter Tuning",
      status: "completed",
      accuracy: 94.2,
      f1Score: 0.93,
      duration: "12m 34s",
      timestamp: "2 hours ago",
    },
    {
      id: "exp-002",
      name: "LightGBM Feature Engineering",
      status: "running",
      accuracy: 92.8,
      f1Score: 0.91,
      duration: "8m 12s",
      timestamp: "15 minutes ago",
    },
    {
      id: "exp-003",
      name: "Random Forest Baseline",
      status: "completed",
      accuracy: 89.5,
      f1Score: 0.88,
      duration: "5m 42s",
      timestamp: "5 hours ago",
    },
    {
      id: "exp-004",
      name: "Neural Network Deep Learning",
      status: "failed",
      accuracy: null,
      f1Score: null,
      duration: "2m 18s",
      timestamp: "1 day ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20"
      case "running":
        return "bg-info/10 text-info border-info/20"
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Recent Experiments</h3>
          <p className="text-sm text-muted-foreground">Track and compare model experiments</p>
        </div>
        <Button variant="outline" size="sm">
          <GitBranch className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Experiment</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Accuracy</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">F1 Score</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Duration</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((exp) => (
              <tr key={exp.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{exp.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{exp.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge className={`text-xs ${getStatusColor(exp.status)}`}>{exp.status}</Badge>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">{exp.accuracy ? `${exp.accuracy}%` : "-"}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-foreground">{exp.f1Score || "-"}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-muted-foreground">{exp.duration}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-muted-foreground">{exp.timestamp}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
