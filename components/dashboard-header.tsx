import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity, GitBranch, Settings, PlayCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">MLOps Pipeline</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link
                href="/experiments"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Experiments
              </Link>
              <Link
                href="/models"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Models
              </Link>
              <Link
                href="/deployments"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Deployments
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <GitBranch className="h-4 w-4 mr-2" />
              main
            </Button>
            <Button size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              Run Pipeline
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
