import { type NextRequest, NextResponse } from "next/server"

// Mock model data
const models = [
  {
    id: "customer-churn",
    name: "customer-churn-predictor",
    type: "XGBoost",
    version: "v2.1.0",
    accuracy: 94.2,
    size: "45.2 MB",
    status: "active",
    createdAt: "2024-09-15T10:30:00Z",
    updatedAt: "2024-10-01T08:15:00Z",
  },
  {
    id: "price-prediction",
    name: "price-prediction-model",
    type: "LightGBM",
    version: "v1.5.2",
    accuracy: 92.8,
    size: "38.7 MB",
    status: "active",
    createdAt: "2024-08-20T14:20:00Z",
    updatedAt: "2024-09-30T12:00:00Z",
  },
  {
    id: "sentiment-analysis",
    name: "sentiment-analyzer",
    type: "BERT",
    version: "v3.0.1",
    accuracy: 96.5,
    size: "420 MB",
    status: "active",
    createdAt: "2024-07-10T09:00:00Z",
    updatedAt: "2024-09-28T16:45:00Z",
  },
  {
    id: "fraud-detection",
    name: "fraud-detector",
    type: "Random Forest",
    version: "v1.2.0",
    accuracy: 89.3,
    size: "28.4 MB",
    status: "active",
    createdAt: "2024-06-05T11:30:00Z",
    updatedAt: "2024-09-24T10:20:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    let filteredModels = models

    if (status) {
      filteredModels = filteredModels.filter((m) => m.status === status)
    }

    if (type) {
      filteredModels = filteredModels.filter((m) => m.type === type)
    }

    return NextResponse.json({
      success: true,
      models: filteredModels,
      count: filteredModels.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching models:", error)
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, version, file } = body

    if (!name || !type || !version) {
      return NextResponse.json({ error: "Missing required fields: name, type, version" }, { status: 400 })
    }

    // In production, this would upload the model file and register it
    const newModel = {
      id: `model-${Date.now()}`,
      name,
      type,
      version,
      accuracy: 0,
      size: "0 MB",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      model: newModel,
      message: "Model registered successfully",
    })
  } catch (error) {
    console.error("[v0] Error registering model:", error)
    return NextResponse.json({ error: "Failed to register model" }, { status: 500 })
  }
}
