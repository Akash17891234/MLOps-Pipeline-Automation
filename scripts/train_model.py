"""
MLOps Training Script with MLflow Integration
Trains a machine learning model with experiment tracking
"""

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.datasets import make_classification
import json
import time

# Set MLflow tracking URI (in production, use remote server)
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("customer-churn-prediction")

def generate_sample_data(n_samples=10000):
    """Generate sample dataset for demonstration"""
    X, y = make_classification(
        n_samples=n_samples,
        n_features=20,
        n_informative=15,
        n_redundant=5,
        random_state=42
    )
    
    feature_names = [f"feature_{i}" for i in range(X.shape[1])]
    df = pd.DataFrame(X, columns=feature_names)
    df['target'] = y
    
    return df

def train_model(model_type="random_forest", hyperparameters=None):
    """Train model with MLflow tracking"""
    
    # Start MLflow run
    with mlflow.start_run(run_name=f"{model_type}_experiment"):
        start_time = time.time()
        
        # Log parameters
        mlflow.log_param("model_type", model_type)
        mlflow.log_param("dataset_size", 10000)
        
        # Generate and split data
        print("Generating dataset...")
        df = generate_sample_data()
        X = df.drop('target', axis=1)
        y = df['target']
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Initialize model based on type
        if model_type == "random_forest":
            params = hyperparameters or {
                "n_estimators": 100,
                "max_depth": 10,
                "min_samples_split": 2,
                "random_state": 42
            }
            model = RandomForestClassifier(**params)
        elif model_type == "gradient_boosting":
            params = hyperparameters or {
                "n_estimators": 100,
                "learning_rate": 0.1,
                "max_depth": 6,
                "random_state": 42
            }
            model = GradientBoostingClassifier(**params)
        else:
            raise ValueError(f"Unknown model type: {model_type}")
        
        # Log hyperparameters
        for param, value in params.items():
            mlflow.log_param(param, value)
        
        # Train model
        print(f"Training {model_type} model...")
        model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        # Calculate metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        auc = roc_auc_score(y_test, y_pred_proba)
        
        # Log metrics
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("precision", precision)
        mlflow.log_metric("recall", recall)
        mlflow.log_metric("f1_score", f1)
        mlflow.log_metric("auc", auc)
        
        # Calculate training time
        training_time = time.time() - start_time
        mlflow.log_metric("training_time_seconds", training_time)
        
        # Log model
        mlflow.sklearn.log_model(model, "model")
        
        # Log feature importance
        if hasattr(model, 'feature_importances_'):
            feature_importance = pd.DataFrame({
                'feature': X.columns,
                'importance': model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            feature_importance.to_csv('feature_importance.csv', index=False)
            mlflow.log_artifact('feature_importance.csv')
        
        # Print results
        print(f"\n{'='*50}")
        print(f"Model: {model_type}")
        print(f"{'='*50}")
        print(f"Accuracy:  {accuracy:.4f}")
        print(f"Precision: {precision:.4f}")
        print(f"Recall:    {recall:.4f}")
        print(f"F1 Score:  {f1:.4f}")
        print(f"AUC:       {auc:.4f}")
        print(f"Training Time: {training_time:.2f}s")
        print(f"{'='*50}\n")
        
        return {
            "run_id": mlflow.active_run().info.run_id,
            "metrics": {
                "accuracy": accuracy,
                "precision": precision,
                "recall": recall,
                "f1_score": f1,
                "auc": auc
            }
        }

if __name__ == "__main__":
    # Train multiple models for comparison
    models = [
        ("random_forest", {"n_estimators": 100, "max_depth": 10}),
        ("random_forest", {"n_estimators": 200, "max_depth": 15}),
        ("gradient_boosting", {"n_estimators": 100, "learning_rate": 0.1}),
        ("gradient_boosting", {"n_estimators": 150, "learning_rate": 0.05}),
    ]
    
    results = []
    for model_type, params in models:
        result = train_model(model_type, params)
        results.append(result)
    
    print("\nAll experiments completed!")
    print(f"View results at: http://localhost:5000")
