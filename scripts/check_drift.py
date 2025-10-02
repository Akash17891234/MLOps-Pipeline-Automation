"""
Data drift detection script
Monitors for distribution changes in input data
"""

import pandas as pd
import numpy as np
from scipy import stats
import sys

def detect_drift(reference_data, current_data, threshold=0.05):
    """
    Detect data drift using Kolmogorov-Smirnov test
    
    Args:
        reference_data: Historical reference dataset
        current_data: Current production data
        threshold: P-value threshold for drift detection
    
    Returns:
        bool: True if drift detected
    """
    
    drift_detected = False
    drift_features = []
    
    for column in reference_data.columns:
        if column in current_data.columns:
            # Perform KS test
            statistic, p_value = stats.ks_2samp(
                reference_data[column],
                current_data[column]
            )
            
            if p_value < threshold:
                drift_detected = True
                drift_features.append({
                    'feature': column,
                    'p_value': p_value,
                    'statistic': statistic
                })
                print(f"⚠️  Drift detected in feature '{column}' (p-value: {p_value:.4f})")
    
    return drift_detected, drift_features

def main():
    """Main drift detection logic"""
    
    # In production, load actual reference and current data
    # For demonstration, we'll generate sample data
    
    print("Checking for data drift...")
    
    # Generate reference data (training distribution)
    np.random.seed(42)
    reference_data = pd.DataFrame({
        'feature_1': np.random.normal(0, 1, 1000),
        'feature_2': np.random.normal(5, 2, 1000),
        'feature_3': np.random.exponential(2, 1000),
    })
    
    # Generate current data (similar distribution - no drift)
    current_data = pd.DataFrame({
        'feature_1': np.random.normal(0, 1, 500),
        'feature_2': np.random.normal(5, 2, 500),
        'feature_3': np.random.exponential(2, 500),
    })
    
    drift_detected, drift_features = detect_drift(reference_data, current_data)
    
    if drift_detected:
        print(f"\n❌ Data drift detected in {len(drift_features)} features")
        print("Consider retraining the model with recent data")
        return 1
    else:
        print("\n✅ No significant data drift detected")
        return 0

if __name__ == "__main__":
    sys.exit(main())
