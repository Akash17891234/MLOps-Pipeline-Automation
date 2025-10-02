import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "24h"

    // Generate mock metrics data
    const metrics = {
      overview: {
        activeExperiments: 12,
        modelAccuracy: 94.2,
        deployments: 8,
        avgTrainingTime: 12.4,
      },
      timeSeries: {
        requests: generateTimeSeriesData(24, 10000, 15000),
        latency: generateTimeSeriesData(24, 30, 60),
        errors: generateTimeSeriesData(24, 0, 10),
      },
      modelPerformance: [
        { epoch: 1, accuracy: 0.72, loss: 0.68 },
        { epoch: 2, accuracy: 0.78, loss: 0.54 },
        { epoch: 3, accuracy: 0.83, loss: 0.42 },
        { epoch: 4, accuracy: 0.87, loss: 0.35 },
        { epoch: 5, accuracy: 0.89, loss: 0.29 },
        { epoch: 6, accuracy: 0.91, loss: 0.24 },
        { epoch: 7, accuracy: 0.93, loss: 0.21 },
        { epoch: 8, accuracy: 0.94, loss: 0.18 },
      ],
    }

    return NextResponse.json({
      success: true,
      metrics,
      timeRange,
    })
  } catch (error) {
    console.error("[v0] Error fetching metrics:", error)
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}

function generateTimeSeriesData(points: number, min: number, max: number) {
  return Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    value: Math.floor(Math.random() * (max - min)) + min,
  }))
}
