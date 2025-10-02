"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar } from "lucide-react"

export function ExperimentFilters() {
  return (
    <Card className="p-4 bg-card border-border mb-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search experiments..." className="pl-10 bg-secondary border-border text-foreground" />
        </div>

        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>

        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Date Range
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="px-3 py-1.5 bg-secondary border border-border rounded-md text-sm text-foreground">
            <option>Latest</option>
            <option>Accuracy</option>
            <option>Duration</option>
            <option>Status</option>
          </select>
        </div>
      </div>
    </Card>
  )
}
