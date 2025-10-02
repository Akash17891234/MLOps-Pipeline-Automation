"""
Simple MLOps Demo - Train and Test a Model
No external dependencies required (uses mock MLflow)
"""

import json
import time
from datetime import datetime
import random

# Simple in-memory "MLflow" for demo
class MockMLflow:
    def __init__(self):
        self.experiments = []
        self.current_run = None
    
    def start_run(self, name):
        self.current_run = {
            "id": f"run-{len(self.experiments) + 1:03d}",
            "name": name,
            "start_time": datetime.now().isoformat(),
            "params": {},
            "metrics": {},
            "status": "running"
        }
        return self
    
    def log_param(self, key, value):
        if self.current_run:
            self.current_run["params"][key] = value
    
    def log_metric(self, key, value):
        if self.current_run:
            self.current_run["metrics"][key] = value
    
    def end_run(self):
        if self.current_run:
            self.current_run["status"] = "completed"
            self.current_run["end_time"] = datetime.now().isoformat()
            self.experiments.append(self.current_run)
            print(f"\n✅ Experiment '{self.current_run['name']}' completed!")
            print(f"   Run ID: {self.current_run['id']}")
            self.current_run = None
    
    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        self.end_run()

# Initialize mock MLflow
mlflow = MockMLflow()

def train_simple_model(model_name, n_estimators, max_depth):
    """Simulate training a model"""
    print(f"\n{'='*60}")
    print(f"🚀 Training Model: {model_name}")
    print(f"{'='*60}")
    
    with mlflow.start_run(f"{model_name}_experiment"):
        # Log parameters
        mlflow.log_param("model_type", model_name)
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)
        mlflow.log_param("dataset", "iris")
        
        print(f"📊 Parameters:")
        print(f"   - Model: {model_name}")
        print(f"   - Estimators: {n_estimators}")
        print(f"   - Max Depth: {max_depth}")
        
        # Simulate training
        print(f"\n⏳ Training in progress...")
        for i in range(5):
            time.sleep(0.3)
            print(f"   Epoch {i+1}/5 {'█' * (i+1)}{'░' * (4-i)}")
        
        # Generate realistic metrics (better with more estimators)
        base_accuracy = 0.85 + (n_estimators / 1000) + (max_depth / 100)
        accuracy = min(0.98, base_accuracy + random.uniform(-0.02, 0.02))
        precision = accuracy + random.uniform(-0.03, 0.01)
        recall = accuracy + random.uniform(-0.02, 0.02)
        f1 = 2 * (precision * recall) / (precision + recall)
        
        # Log metrics
        mlflow.log_metric("accuracy", accuracy)
        mlflow.log_metric("precision", precision)
        mlflow.log_metric("recall", recall)
        mlflow.log_metric("f1_score", f1)
        mlflow.log_metric("training_time", 1.5)
        
        print(f"\n📈 Results:")
        print(f"   - Accuracy:  {accuracy:.4f}")
        print(f"   - Precision: {precision:.4f}")
        print(f"   - Recall:    {recall:.4f}")
        print(f"   - F1 Score:  {f1:.4f}")
        
        return {
            "model": model_name,
            "accuracy": accuracy,
            "metrics": {
                "accuracy": accuracy,
                "precision": precision,
                "recall": recall,
                "f1_score": f1
            }
        }

def make_prediction(model_name, sample_data):
    """Simulate making a prediction"""
    print(f"\n{'='*60}")
    print(f"🔮 Making Prediction with {model_name}")
    print(f"{'='*60}")
    print(f"📥 Input features: {sample_data}")
    
    time.sleep(0.5)
    
    # Simulate prediction
    predictions = ["Setosa", "Versicolor", "Virginica"]
    prediction = random.choice(predictions)
    confidence = random.uniform(0.85, 0.99)
    
    print(f"\n✨ Prediction: {prediction}")
    print(f"   Confidence: {confidence:.2%}")
    
    return {
        "prediction": prediction,
        "confidence": confidence,
        "model": model_name
    }

def main():
    print("\n" + "="*60)
    print("🎯 MLOps Pipeline - Sample Demo")
    print("="*60)
    print("\nThis demo will:")
    print("1. Train 3 different models")
    print("2. Compare their performance")
    print("3. Make sample predictions")
    print("\n" + "="*60)
    
    input("\nPress Enter to start training...")
    
    # Train multiple models
    results = []
    
    models = [
        ("Random Forest", 100, 10),
        ("Random Forest", 200, 15),
        ("Gradient Boosting", 150, 12),
    ]
    
    for model_name, n_est, depth in models:
        result = train_simple_model(model_name, n_est, depth)
        results.append(result)
        time.sleep(0.5)
    
    # Compare results
    print(f"\n{'='*60}")
    print("📊 Model Comparison")
    print(f"{'='*60}")
    print(f"\n{'Model':<25} {'Accuracy':<12} {'Status'}")
    print("-" * 60)
    
    best_model = max(results, key=lambda x: x['accuracy'])
    
    for result in results:
        is_best = "⭐ BEST" if result == best_model else ""
        print(f"{result['model']:<25} {result['accuracy']:.4f}       {is_best}")
    
    # Make predictions with best model
    print(f"\n{'='*60}")
    print(f"🏆 Best Model: {best_model['model']}")
    print(f"{'='*60}")
    
    input("\nPress Enter to make sample predictions...")
    
    # Sample predictions
    samples = [
        [5.1, 3.5, 1.4, 0.2],
        [6.7, 3.0, 5.2, 2.3],
        [5.9, 3.0, 4.2, 1.5],
    ]
    
    predictions = []
    for i, sample in enumerate(samples, 1):
        print(f"\n--- Prediction {i}/3 ---")
        pred = make_prediction(best_model['model'], sample)
        predictions.append(pred)
    
    # Summary
    print(f"\n{'='*60}")
    print("✅ Demo Complete!")
    print(f"{'='*60}")
    print(f"\n📊 Summary:")
    print(f"   - Models Trained: {len(results)}")
    print(f"   - Best Accuracy: {best_model['accuracy']:.4f}")
    print(f"   - Predictions Made: {len(predictions)}")
    print(f"\n💡 Next Steps:")
    print(f"   1. Run 'npm run dev' to view the dashboard")
    print(f"   2. Check out the experiments at http://localhost:3000")
    print(f"   3. Try the API at http://localhost:3000/api/predict")
    print(f"\n{'='*60}\n")
    
    # Save results for dashboard
    with open('demo_results.json', 'w') as f:
        json.dump({
            "experiments": mlflow.experiments,
            "best_model": best_model,
            "predictions": predictions,
            "timestamp": datetime.now().isoformat()
        }, f, indent=2)
    
    print("📁 Results saved to: demo_results.json\n")

if __name__ == "__main__":
    main()
