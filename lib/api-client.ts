// API client utilities for making requests to the MLOps API

export class MLOpsAPIClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  async predict(modelId: string, features: Record<string, any>) {
    const response = await fetch(`${this.baseUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelId, features }),
    })

    if (!response.ok) {
      throw new Error("Prediction failed")
    }

    return response.json()
  }

  async getModels(filters?: { status?: string; type?: string }) {
    const params = new URLSearchParams(filters as any)
    const response = await fetch(`${this.baseUrl}/models?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch models")
    }

    return response.json()
  }

  async getModel(id: string) {
    const response = await fetch(`${this.baseUrl}/models/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch model")
    }

    return response.json()
  }

  async registerModel(data: {
    name: string
    type: string
    version: string
    file?: File
  }) {
    const response = await fetch(`${this.baseUrl}/models`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to register model")
    }

    return response.json()
  }

  async getExperiments(filters?: { status?: string; modelType?: string }) {
    const params = new URLSearchParams(filters as any)
    const response = await fetch(`${this.baseUrl}/experiments?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch experiments")
    }

    return response.json()
  }

  async createExperiment(data: {
    name: string
    modelType: string
    parameters: Record<string, any>
  }) {
    const response = await fetch(`${this.baseUrl}/experiments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create experiment")
    }

    return response.json()
  }

  async getDeployments(filters?: { status?: string; environment?: string }) {
    const params = new URLSearchParams(filters as any)
    const response = await fetch(`${this.baseUrl}/deployments?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch deployments")
    }

    return response.json()
  }

  async createDeployment(data: {
    name: string
    modelId: string
    modelVersion: string
    environment: string
  }) {
    const response = await fetch(`${this.baseUrl}/deployments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create deployment")
    }

    return response.json()
  }

  async getMetrics(timeRange = "24h") {
    const response = await fetch(`${this.baseUrl}/metrics?timeRange=${timeRange}`)

    if (!response.ok) {
      throw new Error("Failed to fetch metrics")
    }

    return response.json()
  }
}

// Export singleton instance
export const apiClient = new MLOpsAPIClient()
