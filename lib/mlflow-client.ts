// MLflow API client for fetching experiment data

export interface MLflowExperiment {
  experiment_id: string
  name: string
  artifact_location: string
  lifecycle_stage: string
}

export interface MLflowRun {
  info: {
    run_id: string
    experiment_id: string
    status: string
    start_time: number
    end_time: number
    artifact_uri: string
  }
  data: {
    metrics: Record<string, number>
    params: Record<string, string>
    tags: Record<string, string>
  }
}

export class MLflowClient {
  private baseUrl: string

  constructor(baseUrl = "http://localhost:5000") {
    this.baseUrl = baseUrl
  }

  async getExperiments(): Promise<MLflowExperiment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/2.0/mlflow/experiments/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch experiments")
      }

      const data = await response.json()
      return data.experiments || []
    } catch (error) {
      console.error("[v0] MLflow API error:", error)
      return []
    }
  }

  async getRuns(experimentId: string): Promise<MLflowRun[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/2.0/mlflow/runs/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiment_ids: [experimentId],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch runs")
      }

      const data = await response.json()
      return data.runs || []
    } catch (error) {
      console.error("[v0] MLflow API error:", error)
      return []
    }
  }

  async getRun(runId: string): Promise<MLflowRun | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/2.0/mlflow/runs/get?run_id=${runId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch run")
      }

      const data = await response.json()
      return data.run || null
    } catch (error) {
      console.error("[v0] MLflow API error:", error)
      return null
    }
  }

  async compareRuns(runIds: string[]): Promise<MLflowRun[]> {
    try {
      const runs = await Promise.all(runIds.map((id) => this.getRun(id)))
      return runs.filter((run): run is MLflowRun => run !== null)
    } catch (error) {
      console.error("[v0] MLflow API error:", error)
      return []
    }
  }
}

export const mlflowClient = new MLflowClient()
