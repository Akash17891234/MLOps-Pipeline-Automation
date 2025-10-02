# Experiment Tracking with MLflow

This guide explains how to use MLflow for tracking machine learning experiments in the MLOps pipeline.

## Overview

MLflow is an open-source platform for managing the ML lifecycle, including experimentation, reproducibility, and deployment. Our pipeline uses MLflow to:

- Track experiment parameters and metrics
- Log model artifacts
- Compare model performance
- Version models for deployment

## Setup

### 1. Install MLflow

\`\`\`bash
pip install -r requirements-ml.txt
\`\`\`

### 2. Start MLflow Tracking Server

\`\`\`bash
mlflow server --host 0.0.0.0 --port 5000
\`\`\`

The MLflow UI will be available at `http://localhost:5000`

### 3. Configure Tracking URI

In your training scripts, set the tracking URI:

\`\`\`python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("your-experiment-name")
\`\`\`

## Tracking Experiments

### Basic Usage

\`\`\`python
import mlflow

# Start a run
with mlflow.start_run(run_name="my_experiment"):
    # Log parameters
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("batch_size", 32)
    
    # Train your model
    model = train_model()
    
    # Log metrics
    mlflow.log_metric("accuracy", 0.95)
    mlflow.log_metric("loss", 0.05)
    
    # Log model
    mlflow.sklearn.log_model(model, "model")
\`\`\`

### Running Training Script

\`\`\`bash
python scripts/train_model.py
\`\`\`

This will:
1. Generate sample data
2. Train multiple models with different hyperparameters
3. Log all experiments to MLflow
4. Save model artifacts

## Viewing Results

### MLflow UI

Access the MLflow UI at `http://localhost:5000` to:

- View all experiments and runs
- Compare metrics across runs
- Visualize training progress
- Download model artifacts

### Dashboard Integration

The MLOps dashboard integrates with MLflow to display:

- Recent experiments
- Model performance metrics
- Experiment comparisons
- Training history

## Best Practices

1. **Organize Experiments**: Use meaningful experiment names
2. **Log Everything**: Parameters, metrics, artifacts, and code versions
3. **Use Tags**: Add tags for easy filtering and organization
4. **Version Data**: Track dataset versions with DVC
5. **Document**: Add notes and descriptions to runs

## Advanced Features

### Hyperparameter Tuning

\`\`\`python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200],
    'max_depth': [10, 15, 20]
}

for params in param_combinations:
    with mlflow.start_run():
        mlflow.log_params(params)
        model = train_with_params(params)
        mlflow.log_metrics(evaluate(model))
\`\`\`

### Model Registry

Register your best models:

\`\`\`python
# Register model
mlflow.register_model(
    model_uri=f"runs:/{run_id}/model",
    name="customer-churn-predictor"
)
\`\`\`

### Comparing Runs

Use the MLflow UI or API to compare runs:

\`\`\`python
from mlflow.tracking import MlflowClient

client = MlflowClient()
runs = client.search_runs(experiment_ids=["1"])

# Compare metrics
for run in runs:
    print(f"Run {run.info.run_id}: {run.data.metrics}")
\`\`\`

## Troubleshooting

### Connection Issues

If you can't connect to MLflow:

1. Check if the server is running: `ps aux | grep mlflow`
2. Verify the port is not in use: `lsof -i :5000`
3. Check firewall settings

### Storage Issues

If artifacts aren't saving:

1. Check disk space
2. Verify artifact location permissions
3. Check MLflow configuration

## Next Steps

- [Data Versioning with DVC](./DATA_VERSIONING.md)
- [Model Deployment](./DEPLOYMENT.md)
- [CI/CD Setup](./CICD.md)
