import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export function DocumentationContent() {
  return (
    <Card className="p-8 bg-card border-border">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-bold text-foreground mb-4">Getting Started</h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Welcome to the MLOps Pipeline Automation platform. This guide will help you set up and deploy your first
          machine learning model with full CI/CD automation.
        </p>

        <Alert className="mb-6 bg-info/10 border-info/20">
          <Info className="h-4 w-4 text-info" />
          <AlertDescription className="text-info">
            This platform provides end-to-end ML lifecycle management including data versioning, experiment tracking,
            model registry, and automated deployment.
          </AlertDescription>
        </Alert>

        <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
          <li>Python 3.8 or higher</li>
          <li>Docker installed and running</li>
          <li>Git for version control</li>
          <li>Basic understanding of machine learning concepts</li>
        </ul>

        <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Quick Start</h3>

        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <p className="text-sm text-muted-foreground mb-2">1. Clone the repository</p>
          <code className="block bg-background p-3 rounded text-sm text-foreground font-mono">
            git clone https://github.com/your-org/mlops-pipeline.git
          </code>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <p className="text-sm text-muted-foreground mb-2">2. Install dependencies</p>
          <code className="block bg-background p-3 rounded text-sm text-foreground font-mono">
            pip install -r requirements.txt
          </code>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <p className="text-sm text-muted-foreground mb-2">3. Initialize DVC for data versioning</p>
          <code className="block bg-background p-3 rounded text-sm text-foreground font-mono">
            dvc init
            <br />
            dvc remote add -d storage s3://your-bucket/dvc-storage
          </code>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <p className="text-sm text-muted-foreground mb-2">4. Start MLflow tracking server</p>
          <code className="block bg-background p-3 rounded text-sm text-foreground font-mono">
            mlflow server --host 0.0.0.0 --port 5000
          </code>
        </div>

        <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Project Structure</h3>
        <div className="bg-secondary/50 rounded-lg p-4 border border-border mb-6">
          <pre className="text-sm text-foreground font-mono">
            {`mlops-pipeline/
├── data/              # Dataset storage
├── models/            # Trained model artifacts
├── notebooks/         # Jupyter notebooks
├── src/
│   ├── train.py      # Training script
│   ├── predict.py    # Prediction API
│   └── utils.py      # Utility functions
├── tests/            # Unit tests
├── .github/
│   └── workflows/    # CI/CD pipelines
├── Dockerfile        # Container definition
├── requirements.txt  # Python dependencies
└── dvc.yaml         # DVC pipeline config`}
          </pre>
        </div>

        <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">Next Steps</h3>
        <p className="text-muted-foreground leading-relaxed">
          Now that you have the basics set up, explore the other sections to learn about data versioning with DVC,
          tracking experiments with MLflow, training models, and setting up automated deployments with GitHub Actions.
        </p>
      </div>
    </Card>
  )
}
