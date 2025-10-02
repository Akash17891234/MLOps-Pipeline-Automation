"""
Setup script for DVC (Data Version Control)
Initializes DVC for data versioning
"""

import os
import subprocess

def setup_dvc():
    """Setup DVC for data versioning"""
    
    print("Setting up DVC for data versioning...")
    
    # Initialize DVC
    try:
        subprocess.run(["dvc", "init"], check=True)
        print("✓ DVC initialized")
    except subprocess.CalledProcessError:
        print("✗ DVC initialization failed. Make sure DVC is installed.")
        return
    
    # Create data directory
    os.makedirs("data/raw", exist_ok=True)
    os.makedirs("data/processed", exist_ok=True)
    os.makedirs("data/models", exist_ok=True)
    
    print("✓ Data directories created")
    
    # Create DVC pipeline configuration
    dvc_yaml = """stages:
  prepare:
    cmd: python scripts/prepare_data.py
    deps:
      - data/raw
    outs:
      - data/processed
    
  train:
    cmd: python scripts/train_model.py
    deps:
      - data/processed
      - scripts/train_model.py
    outs:
      - data/models/model.pkl
    metrics:
      - metrics.json:
          cache: false
    
  evaluate:
    cmd: python scripts/evaluate_model.py
    deps:
      - data/models/model.pkl
      - data/processed
    metrics:
      - evaluation.json:
          cache: false
"""
    
    with open("dvc.yaml", "w") as f:
        f.write(dvc_yaml)
    
    print("✓ DVC pipeline configuration created")
    
    # Create .dvcignore
    dvcignore = """# Add patterns of files dvc should ignore
*.pyc
__pycache__/
.git/
.env
"""
    
    with open(".dvcignore", "w") as f:
        f.write(dvcignore)
    
    print("\nDVC setup complete!")
    print("\nNext steps:")
    print("1. Add remote storage: dvc remote add -d storage s3://your-bucket/dvc-storage")
    print("2. Track data: dvc add data/raw/dataset.csv")
    print("3. Run pipeline: dvc repro")
    print("4. Push data: dvc push")

if __name__ == "__main__":
    setup_dvc()
