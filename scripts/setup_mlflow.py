"""
Setup script for MLflow tracking server
Initializes MLflow with proper configuration
"""

import os
import subprocess
import sys

def setup_mlflow():
    """Setup MLflow tracking server"""
    
    print("Setting up MLflow tracking server...")
    
    # Create mlflow directory structure
    os.makedirs("mlruns", exist_ok=True)
    os.makedirs("mlartifacts", exist_ok=True)
    
    print("\nMLflow directory structure created!")
    print("\nTo start MLflow tracking server, run:")
    print("  mlflow server --host 0.0.0.0 --port 5000")
    print("\nThen access the UI at: http://localhost:5000")
    
    # Create requirements file for MLflow
    requirements = """mlflow==2.9.2
scikit-learn==1.3.2
pandas==2.1.4
numpy==1.26.2
xgboost==2.0.3
lightgbm==4.1.0
"""
    
    with open("requirements-ml.txt", "w") as f:
        f.write(requirements)
    
    print("\nCreated requirements-ml.txt")
    print("Install dependencies with: pip install -r requirements-ml.txt")

if __name__ == "__main__":
    setup_mlflow()
