"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { epoch: 1, accuracy: 0.72, loss: 0.68 },
  { epoch: 2, accuracy: 0.78, loss: 0.54 },
  { epoch: 3, accuracy: 0.83, loss: 0.42 },
  { epoch: 4, accuracy: 0.87, loss: 0.35 },
  { epoch: 5, accuracy: 0.89, loss: 0.29 },
  { epoch: 6, accuracy: 0.91, loss: 0.24 },
  { epoch: 7, accuracy: 0.93, loss: 0.21 },
  { epoch: 8, accuracy: 0.94, loss: 0.18 },
]

export function ModelPerformance() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Model Performance</h3>
        <p className="text-sm text-muted-foreground">Training metrics over epochs</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.02 264)" />
          <XAxis dataKey="epoch" stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)" }} />
          <YAxis stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.16 0.015 264)",
              border: "1px solid oklch(0.24 0.02 264)",
              borderRadius: "8px",
              color: "oklch(0.98 0.01 264)",
            }}
          />
          <Legend wrapperStyle={{ color: "oklch(0.62 0.02 264)" }} />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="oklch(0.65 0.24 264)"
            strokeWidth={2}
            dot={{ fill: "oklch(0.65 0.24 264)" }}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="oklch(0.60 0.20 220)"
            strokeWidth={2}
            dot={{ fill: "oklch(0.60 0.20 220)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
