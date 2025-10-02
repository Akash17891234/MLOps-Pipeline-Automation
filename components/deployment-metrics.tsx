"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const latencyData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  latency: Math.floor(Math.random() * 30) + 30,
}))

const requestsData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 5000) + 10000,
}))

export function DeploymentMetrics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-card border-border">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">Request Volume</h3>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={requestsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.02 264)" />
            <XAxis dataKey="time" stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)", fontSize: 12 }} />
            <YAxis stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.015 264)",
                border: "1px solid oklch(0.24 0.02 264)",
                borderRadius: "8px",
                color: "oklch(0.98 0.01 264)",
              }}
            />
            <Line type="monotone" dataKey="requests" stroke="oklch(0.65 0.24 264)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">Average Latency</h3>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={latencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.24 0.02 264)" />
            <XAxis dataKey="time" stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)", fontSize: 12 }} />
            <YAxis stroke="oklch(0.62 0.02 264)" tick={{ fill: "oklch(0.62 0.02 264)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0.015 264)",
                border: "1px solid oklch(0.24 0.02 264)",
                borderRadius: "8px",
                color: "oklch(0.98 0.01 264)",
              }}
            />
            <Line type="monotone" dataKey="latency" stroke="oklch(0.70 0.18 180)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
