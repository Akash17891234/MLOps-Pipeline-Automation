import { type NextRequest, NextResponse } from "next/server"

const experiments = [
  {
    id: "exp-001",
    name: "XGBoost Hyperparameter Tuning",
    status: "completed",
    modelType: "XGBoost",
    metrics: {
      accuracy: 94.2,
      precision: 93.8,
      recall: 94.5,
      f1Score: 94.1,
    },
    parameters: {
      max_depth: 6,
      learning_rate: 0.1,
      n_estimators: 100,
      subsample: 0.8,
    },
    duration: "12m 34s",
    createdAt: "2024-10-01T06:00:00Z",
    completedAt: "2024-10-01T06:12:34Z",
  },
  {
    id: "exp-002",
    name: "LightGBM Feature Engineering",
    status: "running",
    modelType: "LightGBM",
    metrics: {
      accuracy: 92.8,
      precision: 92.3,
      recall: 93.1,
      f1Score: 92.7,
    },
    parameters: {
      num_leaves: 31,
      learning_rate: 0.05,
      n_estimators: 150,
    },
    duration: "8m 12s",
    createdAt: "2024-10-01T09:45:00Z",
    completedAt: null,
  },
  {
    id: "exp-003",
    name: "Random Forest Baseline",
    status: "completed",
    modelType: "Random Forest",
    metrics: {
      accuracy: 89.5,
      precision: 88.9,
      recall: 90.2,
      f1Score: 89.5,
    },
    parameters: {
      n_estimators: 100,
      max_depth: 10,
      min_samples_split: 2,
    },
    duration: "5m 42s",
    createdAt: "2024-10-01T05:00:00Z",
    completedAt: "2024-10-01T05:05:42Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const modelType = searchParams.get("modelType")

    let filteredExperiments = experiments

    if (status) {
      filteredExperiments = filteredExperiments.filter((e) => e.status === status)
    }

    if (modelType) {
      filteredExperiments = filteredExperiments.filter((e) => e.modelType === modelType)
    }

    return NextResponse.json({
      success: true,
      experiments: filteredExperiments,
      count: filteredExperiments.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching experiments:", error)
    return NextResponse.json({ error: "Failed to fetch experiments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, modelType, parameters } = body

    if (!name || !modelType || !parameters) {
      return NextResponse.json({ error: "Missing required fields: name, modelType, parameters" }, { status: 400 })
    }

    const newExperiment = {
      id: `exp-${Date.now()}`,
      name,
      modelType,
      status: "running",
      parameters,
      metrics: null,
      duration: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }

    return NextResponse.json({
      success: true,
      experiment: newExperiment,
      message: "Experiment started successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating experiment:", error)
    return NextResponse.json({ error: "Failed to create experiment" }, { status: 500 })
  }
}
