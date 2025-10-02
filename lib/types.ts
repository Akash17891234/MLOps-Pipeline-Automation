export interface Experiment {
  id: string
  name: string
  status: "running" | "completed" | "failed"
  accuracy: number | null
  f1Score: number | null
  precision: number | null
  recall: number | null
  parameters: Record<string, any>
  duration: string
  timestamp: string
  modelType: string
}

export interface Deployment {
  id: string
  name: string
  version: string
  status: "active" | "deploying" | "failed" | "stopped"
  environment: "production" | "staging" | "development"
  uptime: string
  requests: string
  latency: string
  errorRate: string
  createdAt: string
  updatedAt: string
}

export interface ModelMetrics {
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  auc: number
  confusionMatrix: number[][]
}

export interface PredictionRequest {
  features: Record<string, any>
  modelId: string
}

export interface PredictionResponse {
  prediction: any
  confidence: number
  modelVersion: string
  timestamp: string
}
