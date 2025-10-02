# MLOps Pipeline Automation

A complete end-to-end MLOps platform for managing the full machine learning lifecycle, from data versioning to automated deployment.

![MLOps Dashboard](https://img.shields.io/badge/MLOps-Dashboard-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Quick Start (2 Minutes)

Get the dashboard running immediately with mock data - no Python or Docker required!

\`\`\`bash
# Install dependencies
npm install

# Start the dashboard
npm run dev
\`\`\`

Open **http://localhost:3000** - You're done! 🎉

The dashboard works out of the box with mock data, giving you a fully functional MLOps interface to explore.

**Want to train real models?** See [Quick Start Guide](./docs/QUICK_START.md)

---

## ✨ Features

- **📊 Experiment Tracking** - Track experiments, parameters, and metrics with MLflow integration
- **📦 Data Versioning** - Version control for datasets using DVC
- **🗂️ Model Registry** - Centralized model management and versioning
- **🤖 Automated Training** - CI/CD pipelines for automated model training
- **🚀 Deployment** - Containerized deployment with Docker and Kubernetes support
- **📈 Monitoring** - Real-time model performance monitoring and drift detection
- **💻 Interactive Dashboard** - Beautiful web interface built with Next.js and React

---

## 📸 Screenshots

### Dashboard Overview
View key metrics, recent experiments, and model performance at a glance.

### Experiment Tracking
Compare multiple experiments with detailed metrics and visualizations.

### Model Registry
Manage model versions, track performance, and control deployments.

---

## 🏗️ Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     MLOps Dashboard                          │
│              (Next.js + React + Tailwind)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer                               │
│                  (Next.js API Routes)                        │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   MLflow     │   │  Model API   │   │     DVC      │
│   Server     │   │  (FastAPI)   │   │   Storage    │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │  GitHub Actions  │
                  │    (CI/CD)       │
                  └──────────────────┘
\`\`\`

---

## 📚 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get running in 2 minutes
- **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Fix common issues
- **[Getting Started](./docs/GETTING_STARTED.md)** - Detailed setup instructions
- **[Experiment Tracking](./docs/EXPERIMENT_TRACKING.md)** - MLflow integration guide
- **[API Reference](./docs/API_REFERENCE.md)** - Complete API documentation
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment

---

## 🎯 Use Cases

This platform is perfect for:

- **Data Scientists** - Track experiments and compare model performance
- **ML Engineers** - Automate training pipelines and manage deployments
- **DevOps Teams** - Monitor model performance and infrastructure
- **Product Teams** - Understand model behavior and make data-driven decisions

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **shadcn/ui** - Beautiful UI components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Python** - ML training scripts
- **FastAPI** - Model serving (optional)

### ML Tools
- **MLflow** - Experiment tracking and model registry
- **DVC** - Data version control
- **scikit-learn** - Machine learning library
- **XGBoost / LightGBM** - Gradient boosting frameworks

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD automation
- **Vercel** - Dashboard hosting

---

## 📦 Installation Options

### Option 1: Dashboard Only (Fastest)

\`\`\`bash
npm install
npm run dev
\`\`\`

### Option 2: With Model Training

\`\`\`bash
# Install Python dependencies
pip install scikit-learn pandas numpy mlflow

# Start MLflow
mlflow server --host 0.0.0.0 --port 5000

# Train a model
python scripts/train_model.py

# Start dashboard
npm run dev
\`\`\`

### Option 3: Full Stack with Docker

\`\`\`bash
docker-compose up -d
\`\`\`

---

## 🚀 Usage

### Training Models

\`\`\`bash
python scripts/train_model.py
\`\`\`

### Making Predictions

\`\`\`bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "customer-churn",
    "features": {"feature_1": 0.5, "feature_2": 1.2}
  }'
\`\`\`

### Monitoring

\`\`\`bash
# Check model performance
python scripts/monitor_model.py

# Check for data drift
python scripts/check_drift.py
\`\`\`

---

## 🔄 CI/CD Pipeline

Automated workflows for:

- ✅ **Testing** - Run unit tests and code quality checks
- ✅ **Training** - Automatically retrain models on new data
- ✅ **Building** - Create Docker images
- ✅ **Deployment** - Deploy to production
- ✅ **Monitoring** - Continuous model monitoring

### Required GitHub Secrets

\`\`\`
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
DOCKER_USERNAME
DOCKER_PASSWORD
MLFLOW_TRACKING_URI
VERCEL_TOKEN
\`\`\`

---

## 📊 Project Structure

\`\`\`
mlops-pipeline/
├── app/                    # Next.js application
│   ├── api/               # API routes
│   ├── experiments/       # Experiments page
│   ├── models/           # Models page
│   └── deployments/      # Deployments page
├── components/            # React components
├── scripts/              # Python ML scripts
│   ├── train_model.py
│   ├── setup_mlflow.py
│   └── monitor_model.py
├── lib/                  # Utilities and helpers
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD pipelines
├── Dockerfile           # Docker configuration
└── docker-compose.yml   # Multi-container setup
\`\`\`

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

Having issues? We're here to help!

- **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)** - Fix common problems
- **[Quick Start Guide](./docs/QUICK_START.md)** - Step-by-step setup
- **GitHub Issues** - Report bugs or request features
- **Discussions** - Ask questions and share ideas

---

## 🙏 Acknowledgments

Built with amazing open-source tools:
- [MLflow](https://mlflow.org/) - Experiment tracking
- [DVC](https://dvc.org/) - Data versioning
- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Hosting platform
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## ⭐ Star History

If you find this project helpful, please consider giving it a star!

---

**Ready to get started?** Run `npm install && npm run dev` and open http://localhost:3000
