import { type NextRequest, NextResponse } from "next/server"
import { mlflowClient } from "@/lib/mlflow-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const experimentId = searchParams.get("experimentId")

    if (!experimentId) {
      return NextResponse.json({ error: "experimentId is required" }, { status: 400 })
    }

    const runs = await mlflowClient.getRuns(experimentId)

    return NextResponse.json({
      success: true,
      runs,
      count: runs.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching MLflow runs:", error)
    return NextResponse.json({ error: "Failed to fetch runs from MLflow" }, { status: 500 })
  }
}
