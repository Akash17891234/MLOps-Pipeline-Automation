# Getting Started with MLOps Pipeline

This guide will walk you through setting up and running your first ML pipeline.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [First Model Training](#first-model-training)
4. [Viewing Results](#viewing-results)
5. [Making Predictions](#making-predictions)
6. [Next Steps](#next-steps)

## Installation

### System Requirements

- **Operating System**: Linux, macOS, or Windows with WSL2
- **Python**: 3.10 or higher
- **Node.js**: 20 or higher
- **Docker**: 20.10 or higher (optional but recommended)
- **Git**: 2.30 or higher

### Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/your-org/mlops-pipeline.git
cd mlops-pipeline
\`\`\`

### Step 2: Create Virtual Environment

\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
\`\`\`

### Step 3: Install Dependencies

\`\`\`bash
# Python dependencies
pip install -r requirements-ml.txt
pip install -r requirements-dev.txt

# Node.js dependencies
npm install
\`\`\`

### Step 4: Verify Installation

\`\`\`bash
python --version  # Should be 3.10+
node --version    # Should be 20+
docker --version  # Should be 20.10+
\`\`\`

## Configuration

### MLflow Setup

Initialize MLflow tracking server:

\`\`\`bash
python scripts/setup_mlflow.py
\`\`\`

This creates:
- `mlruns/` directory for experiment data
- `mlartifacts/` directory for model artifacts

Start the MLflow server:

\`\`\`bash
mlflow server --host 0.0.0.0 --port 5000
\`\`\`

Access the UI at `http://localhost:5000`

### DVC Setup

Initialize DVC for data versioning:

\`\`\`bash
python scripts/dvc_setup.py
\`\`\`

Configure remote storage (optional):

\`\`\`bash
# For S3
dvc remote add -d storage s3://your-bucket/dvc-storage
dvc remote modify storage access_key_id YOUR_ACCESS_KEY
dvc remote modify storage secret_access_key YOUR_SECRET_KEY

# For Google Cloud Storage
dvc remote add -d storage gs://your-bucket/dvc-storage

# For Azure Blob Storage
dvc remote add -d storage azure://your-container/dvc-storage
\`\`\`

### Environment Variables

Create a `.env` file:

\`\`\`bash
# MLflow
MLFLOW_TRACKING_URI=http://localhost:5000

# API
API_PORT=8000
API_HOST=0.0.0.0

# Dashboard
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MLFLOW_URL=http://localhost:5000
\`\`\`

## First Model Training

### Using the Training Script

Train your first model:

\`\`\`bash
python scripts/train_model.py
\`\`\`

This will:
1. Generate sample data (10,000 samples)
2. Train multiple models (Random Forest, Gradient Boosting)
3. Log experiments to MLflow
4. Save model artifacts

### Understanding the Output

\`\`\`
Generating dataset...
Training random_forest model...

==================================================
Model: random_forest
==================================================
Accuracy:  0.9420
Precision: 0.9380
Recall:    0.9450
F1 Score:  0.9410
AUC:       0.9650
Training Time: 12.34s
==================================================
\`\`\`

### Viewing in MLflow

1. Open `http://localhost:5000`
2. Click on "customer-churn-prediction" experiment
3. View all runs with metrics and parameters
4. Compare different runs
5. Download model artifacts

## Viewing Results

### MLflow UI

The MLflow UI provides:

- **Experiments List**: All your experiments
- **Runs Comparison**: Compare metrics across runs
- **Metrics Visualization**: Charts and graphs
- **Parameters**: Hyperparameters used
- **Artifacts**: Model files and outputs

### Dashboard

Start the Next.js dashboard:

\`\`\`bash
npm run dev
\`\`\`

Access at `http://localhost:3000`

The dashboard shows:
- Overview metrics
- Recent experiments
- Model performance charts
- Deployment status

## Making Predictions

### Using the API

Start the model API:

\`\`\`bash
uvicorn src.api:app --reload --port 8000
\`\`\`

Make a prediction:

\`\`\`bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "customer-churn",
    "features": {
      "feature_1": 0.5,
      "feature_2": 1.2,
      "feature_3": -0.3
    }
  }'
\`\`\`

Response:

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

### Using Python

\`\`\`python
from lib.api_client import apiClient

# Make prediction
result = await apiClient.predict(
    modelId="customer-churn",
    features={
        "feature_1": 0.5,
        "feature_2": 1.2,
        "feature_3": -0.3
    }
)

print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result['confidence']:.2%}")
\`\`\`

## Next Steps

Now that you have the basics working:

1. **Customize Training**: Modify `scripts/train_model.py` for your data
2. **Add Your Data**: Place datasets in `data/raw/`
3. **Version Data**: Use DVC to track your datasets
4. **Setup CI/CD**: Configure GitHub Actions for automation
5. **Deploy**: Deploy your models to production

### Recommended Reading

- [Experiment Tracking Guide](./EXPERIMENT_TRACKING.md)
- [Data Versioning Guide](./DATA_VERSIONING.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [CI/CD Setup Guide](./CICD.md)

## Troubleshooting

### MLflow Server Won't Start

\`\`\`bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process if needed
kill -9 <PID>

# Restart MLflow
mlflow server --host 0.0.0.0 --port 5000
\`\`\`

### Import Errors

\`\`\`bash
# Reinstall dependencies
pip install --upgrade -r requirements-ml.txt
\`\`\`

### Docker Issues

\`\`\`bash
# Restart Docker
sudo systemctl restart docker

# Clean up
docker system prune -a
\`\`\`

## Getting Help

- Check the [FAQ](./FAQ.md)
- Open an issue on GitHub
- Join our community discussions
