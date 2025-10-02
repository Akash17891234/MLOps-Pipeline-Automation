"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp } from "lucide-react"

const comparisonData = [
  {
    name: "XGBoost",
    accuracy: 94.2,
    precision: 93.8,
    recall: 94.5,
    f1: 94.1,
  },
  {
    name: "LightGBM",
    accuracy: 92.8,
    precision: 92.3,
    recall: 93.1,
    f1: 92.7,
  },
  {
    name: "Random Forest",
    accuracy: 89.5,
    precision: 88.9,
    recall: 90.2,
    f1: 89.5,
  },
  {
    name: "Logistic Reg",
    accuracy: 85.3,
    precision: 84.7,
    recall: 86.0,
    f1: 85.3,
  },
]

export function ExperimentComparison() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Model Comparison</h3>
          <p className="text-sm text-muted-foreground">Compare performance across experiments</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            4 experiments selected
          </Badge>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.02 264)" />
          <XAxis dataKey="name" stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)" }} />
          <YAxis stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)" }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.16 0.015 264)",
              border: "1px solid oklch(0.24 0.02 264)",
              borderRadius: "8px",
              color: "oklch(0.98 0.01 264)",
            }}
          />
          <Legend wrapperStyle={{ color: "oklch(0.62 0.02 264)" }} />
          <Bar dataKey="accuracy" fill="oklch(0.65 0.24 264)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="precision" fill="oklch(0.60 0.20 220)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recall" fill="oklch(0.70 0.18 180)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="f1" fill="oklch(0.68 0.20 300)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {comparisonData.map((exp) => (
          <div key={exp.name} className="p-4 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm font-medium text-foreground mb-3">{exp.name}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="text-foreground font-medium">{exp.accuracy}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">F1 Score</span>
                <span className="text-foreground font-medium">{exp.f1}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
