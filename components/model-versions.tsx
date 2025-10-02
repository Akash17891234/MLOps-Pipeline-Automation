import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, GitCommit } from "lucide-react"

export function ModelVersions() {
  const versions = [
    { version: "v2.1.0", status: "production", date: "2 hours ago", accuracy: 94.2 },
    { version: "v2.0.5", status: "staging", date: "1 day ago", accuracy: 93.8 },
    { version: "v2.0.4", status: "archived", date: "3 days ago", accuracy: 93.5 },
    { version: "v2.0.3", status: "archived", date: "1 week ago", accuracy: 92.9 },
    { version: "v2.0.2", status: "archived", date: "2 weeks ago", accuracy: 92.1 },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Version History</h3>
        <p className="text-sm text-muted-foreground">Track model versions</p>
      </div>

      <div className="space-y-3">
        {versions.map((version, index) => (
          <div key={version.version} className="relative pl-6 pb-4 border-l-2 border-border last:border-l-0 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 bg-background">
              {version.status === "production" ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <GitCommit className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground font-mono">{version.version}</span>
                <Badge
                  className={`text-xs ${
                    version.status === "production"
                      ? "bg-success/10 text-success border-success/20"
                      : version.status === "staging"
                        ? "bg-info/10 text-info border-info/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {version.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{version.date}</span>
                <span className="text-foreground font-medium">{version.accuracy}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
