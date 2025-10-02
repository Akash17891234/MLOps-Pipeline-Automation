# API Reference

Complete API documentation for the MLOps Pipeline.

## Base URL

\`\`\`
http://localhost:8000/api
\`\`\`

## Authentication

Currently, the API does not require authentication. In production, implement proper authentication using JWT tokens or API keys.

## Endpoints

### Predictions

#### POST /predict

Make a prediction using a trained model.

**Request:**

\`\`\`json
{
  "modelId": "customer-churn",
  "features": {
    "feature_1": 0.5,
    "feature_2": 1.2,
    "feature_3": -0.3
  }
}
\`\`\`

**Response:**

\`\`\`json
{
  "success": true,
  "prediction": "retain",
  "confidence": 0.92,
  "modelId": "customer-churn",
  "modelVersion": "v2.1.0",
  "timestamp": "2024-10-01T10:30:00Z"
}
\`\`\`

### Models

#### GET /models

List all registered models.

**Query Parameters:**
- `status` (optional): Filter by status (active, pending, archived)
- `type` (optional): Filter by model type (XGBoost, LightGBM, etc.)

**Response:**

\`\`\`json
{
  "success": true,
  "models": [
    {
      "id": "customer-churn",
      "name": "customer-churn-predictor",
      "type": "XGBoost",
      "version": "v2.1.0",
      "accuracy": 94.2,
      "status": "active"
    }
  ],
  "count": 1
}
\`\`\`

#### GET /models/:id

Get details for a specific model.

**Response:**

\`\`\`json
{
  "success": true,
  "model": {
    "id": "customer-churn",
    "name": "customer-churn-predictor",
    "type": "XGBoost",
    "version": "v2.1.0",
    "accuracy": 92.5,
    "metrics": {
      "precision": 0.93,
      "recall": 0.91,
      "f1Score": 0.92
    }
  }
}
\`\`\`

#### POST /models

Register a new model.

**Request:**

\`\`\`json
{
  "name": "fraud-detector",
  "type": "Random Forest",
  "version": "v1.0.0"
}
\`\`\`

### Experiments

#### GET /experiments

List all experiments.

**Query Parameters:**
- `status` (optional): Filter by status
- `modelType` (optional): Filter by model type

**Response:**

\`\`\`json
{
  "success": true,
  "experiments": [
    {
      "id": "exp-001",
      "name": "XGBoost Tuning",
      "status": "completed",
      "metrics": {
        "accuracy": 94.2,
        "f1Score": 94.1
      }
    }
  ]
}
\`\`\`

#### POST /experiments

Create a new experiment.

**Request:**

\`\`\`json
{
  "name": "New Experiment",
  "modelType": "XGBoost",
  "parameters": {
    "max_depth": 6,
    "learning_rate": 0.1
  }
}
\`\`\`

### Deployments

#### GET /deployments

List all deployments.

**Response:**

\`\`\`json
{
  "success": true,
  "deployments": [
    {
      "id": "dep-001",
      "name": "customer-churn-v2.1",
      "status": "active",
      "environment": "production",
      "metrics": {
        "uptime": "99.9%",
        "requests": 1200000
      }
    }
  ]
}
\`\`\`

#### POST /deployments

Create a new deployment.

**Request:**

\`\`\`json
{
  "name": "fraud-detector-prod",
  "modelId": "fraud-detection",
  "modelVersion": "v1.2.0",
  "environment": "production"
}
\`\`\`

### Metrics

#### GET /metrics

Get system metrics.

**Query Parameters:**
- `timeRange` (optional): Time range (24h, 7d, 30d)

**Response:**

\`\`\`json
{
  "success": true,
  "metrics": {
    "overview": {
      "activeExperiments": 12,
      "modelAccuracy": 94.2,
      "deployments": 8
    },
    "timeSeries": {
      "requests": [...],
      "latency": [...]
    }
  }
}
\`\`\`

## Error Responses

All endpoints return errors in this format:

\`\`\`json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {}
}
\`\`\`

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. In production, implement rate limiting to prevent abuse.

## Webhooks

Configure webhooks to receive notifications for:
- Model training completion
- Deployment status changes
- Performance alerts

## SDKs

### Python

\`\`\`python
from lib.api_client import MLOpsAPIClient

client = MLOpsAPIClient()
result = await client.predict("customer-churn", features)
\`\`\`

### JavaScript

\`\`\`javascript
import { apiClient } from '@/lib/api-client'

const result = await apiClient.predict('customer-churn', features)
