import { type NextRequest, NextResponse } from "next/server"

const deployments = [
  {
    id: "dep-001",
    name: "customer-churn-v2.1",
    modelId: "customer-churn",
    modelVersion: "v2.1.0",
    status: "active",
    environment: "production",
    endpoint: "https://api.mlops.dev/predict/churn",
    metrics: {
      uptime: "99.9%",
      requests: 1200000,
      avgLatency: 45,
      errorRate: 0.01,
    },
    createdAt: "2024-10-01T08:00:00Z",
    updatedAt: "2024-10-01T10:00:00Z",
  },
  {
    id: "dep-002",
    name: "price-prediction-v1.5",
    modelId: "price-prediction",
    modelVersion: "v1.5.2",
    status: "active",
    environment: "production",
    endpoint: "https://api.mlops.dev/predict/price",
    metrics: {
      uptime: "99.8%",
      requests: 856000,
      avgLatency: 38,
      errorRate: 0.02,
    },
    createdAt: "2024-09-30T10:00:00Z",
    updatedAt: "2024-10-01T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const environment = searchParams.get("environment")

    let filteredDeployments = deployments

    if (status) {
      filteredDeployments = filteredDeployments.filter((d) => d.status === status)
    }

    if (environment) {
      filteredDeployments = filteredDeployments.filter((d) => d.environment === environment)
    }

    return NextResponse.json({
      success: true,
      deployments: filteredDeployments,
      count: filteredDeployments.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching deployments:", error)
    return NextResponse.json({ error: "Failed to fetch deployments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, modelId, modelVersion, environment } = body

    if (!name || !modelId || !modelVersion || !environment) {
      return NextResponse.json(
        { error: "Missing required fields: name, modelId, modelVersion, environment" },
        { status: 400 },
      )
    }

    const newDeployment = {
      id: `dep-${Date.now()}`,
      name,
      modelId,
      modelVersion,
      status: "deploying",
      environment,
      endpoint: `https://api.mlops.dev/predict/${modelId}`,
      metrics: {
        uptime: "-",
        requests: 0,
        avgLatency: 0,
        errorRate: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      deployment: newDeployment,
      message: "Deployment initiated successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating deployment:", error)
    return NextResponse.json({ error: "Failed to create deployment" }, { status: 500 })
  }
}
