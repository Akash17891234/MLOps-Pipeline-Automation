import { type NextRequest, NextResponse } from "next/server"
import { mlflowClient } from "@/lib/mlflow-client"

export async function GET(request: NextRequest) {
  try {
    const experiments = await mlflowClient.getExperiments()

    return NextResponse.json({
      success: true,
      experiments,
      count: experiments.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching MLflow experiments:", error)
    return NextResponse.json({ error: "Failed to fetch experiments from MLflow" }, { status: 500 })
  }
}
