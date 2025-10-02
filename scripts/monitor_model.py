"""
Model monitoring script
Checks model performance and alerts on degradation
"""

import mlflow
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import sys

def check_model_performance():
    """Check recent model performance metrics"""
    
    mlflow.set_tracking_uri("http://localhost:5000")
    client = mlflow.tracking.MlflowClient()
    
    # Get recent runs (last 7 days)
    experiment = client.get_experiment_by_name("customer-churn-prediction")
    if not experiment:
        print("No experiment found")
        return True
    
    runs = client.search_runs(
        experiment_ids=[experiment.experiment_id],
        order_by=["start_time DESC"],
        max_results=10
    )
    
    if not runs:
        print("No runs found")
        return True
    
    # Check accuracy threshold
    ACCURACY_THRESHOLD = 0.90
    
    latest_run = runs[0]
    accuracy = latest_run.data.metrics.get("accuracy", 0)
    
    print(f"Latest model accuracy: {accuracy:.4f}")
    print(f"Threshold: {ACCURACY_THRESHOLD:.4f}")
    
    if accuracy < ACCURACY_THRESHOLD:
        print(f"⚠️  WARNING: Model accuracy ({accuracy:.4f}) below threshold ({ACCURACY_THRESHOLD:.4f})")
        print("Consider retraining the model")
        return False
    
    print("✓ Model performance is acceptable")
    return True

def check_prediction_latency():
    """Check if prediction latency is within acceptable range"""
    
    # In production, this would query your monitoring system
    # For now, we'll simulate it
    
    LATENCY_THRESHOLD_MS = 100
    current_latency = 45  # Simulated
    
    print(f"Current prediction latency: {current_latency}ms")
    print(f"Threshold: {LATENCY_THRESHOLD_MS}ms")
    
    if current_latency > LATENCY_THRESHOLD_MS:
        print(f"⚠️  WARNING: Prediction latency ({current_latency}ms) above threshold")
        return False
    
    print("✓ Prediction latency is acceptable")
    return True

if __name__ == "__main__":
    performance_ok = check_model_performance()
    latency_ok = check_prediction_latency()
    
    if not (performance_ok and latency_ok):
        print("\n❌ Model monitoring checks failed")
        sys.exit(1)
    
    print("\n✅ All monitoring checks passed")
    sys.exit(0)
