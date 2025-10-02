import { Card } from "@/components/ui/card"
import { BookOpen, Rocket, GitBranch, Settings, Code, Database } from "lucide-react"

export function DocumentationNav() {
  const sections = [
    { icon: BookOpen, label: "Getting Started", active: true },
    { icon: Database, label: "Data Versioning", active: false },
    { icon: GitBranch, label: "Experiment Tracking", active: false },
    { icon: Code, label: "Model Training", active: false },
    { icon: Rocket, label: "Deployment", active: false },
    { icon: Settings, label: "CI/CD Setup", active: false },
  ]

  return (
    <Card className="p-4 bg-card border-border sticky top-6">
      <nav className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                section.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          )
        })}
      </nav>
    </Card>
  )
}
