import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Star } from "lucide-react"

export function ModelRegistry() {
  const models = [
    {
      name: "customer-churn-predictor",
      type: "XGBoost",
      version: "v2.1.0",
      accuracy: 94.2,
      size: "45.2 MB",
      downloads: 1243,
      starred: true,
      updatedAt: "2 hours ago",
    },
    {
      name: "price-prediction-model",
      type: "LightGBM",
      version: "v1.5.2",
      accuracy: 92.8,
      size: "38.7 MB",
      downloads: 856,
      starred: false,
      updatedAt: "1 day ago",
    },
    {
      name: "sentiment-analyzer",
      type: "BERT",
      version: "v3.0.1",
      accuracy: 96.5,
      size: "420 MB",
      downloads: 2104,
      starred: true,
      updatedAt: "3 days ago",
    },
    {
      name: "fraud-detector",
      type: "Random Forest",
      version: "v1.2.0",
      accuracy: 89.3,
      size: "28.4 MB",
      downloads: 634,
      starred: false,
      updatedAt: "1 week ago",
    },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Registered Models</h3>
        <p className="text-sm text-muted-foreground">Browse and manage your model artifacts</p>
      </div>

      <div className="space-y-4">
        {models.map((model) => (
          <div
            key={model.name}
            className="p-5 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{model.name}</h4>
                  {model.starred && <Star className="h-4 w-4 text-warning fill-warning" />}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {model.type}
                  </Badge>
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/20">{model.version}</Badge>
                  <span className="text-xs text-muted-foreground">{model.updatedAt}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-sm font-medium text-foreground">{model.accuracy}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Size</p>
                <p className="text-sm font-medium text-foreground">{model.size}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Downloads</p>
                <p className="text-sm font-medium text-foreground">{model.downloads.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
