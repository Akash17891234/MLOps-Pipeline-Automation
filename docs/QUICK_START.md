# Quick Start Guide - Get Running in 2 Minutes

This guide gets you up and running with the MLOps dashboard as fast as possible.

## Option 1: Dashboard Only (Recommended for First Time)

**Time: 2 minutes**

This runs the full dashboard with mock data - no Python, Docker, or MLflow needed!

### Step 1: Install Node.js

Check if you have Node.js:
\`\`\`bash
node --version
\`\`\`

If not, install it:
- **macOS:** `brew install node`
- **Windows/Linux:** Download from [nodejs.org](https://nodejs.org)

### Step 2: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 3: Run the Dashboard

\`\`\`bash
npm run dev
\`\`\`

### Step 4: Open in Browser

Go to: **http://localhost:3000**

**That's it!** You now have a fully functional MLOps dashboard with:
- Experiment tracking
- Model registry
- Deployment monitoring
- Performance metrics
- Interactive charts

---

## Option 2: With Model Training

**Time: 10 minutes**

Want to actually train models? Follow these steps.

### Prerequisites

- Python 3.10+
- Node.js 20+

### Step 1: Install Python Dependencies

\`\`\`bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install ML libraries
pip install scikit-learn pandas numpy mlflow xgboost lightgbm
\`\`\`

### Step 2: Start MLflow Server

\`\`\`bash
mlflow server --host 0.0.0.0 --port 5000
\`\`\`

Keep this terminal open. Open a new terminal for the next steps.

### Step 3: Train a Model

\`\`\`bash
python scripts/train_model.py
\`\`\`

This will:
- Generate sample data
- Train multiple models
- Log to MLflow
- Save model artifacts

### Step 4: View Results

- **MLflow UI:** http://localhost:5000
- **Dashboard:** http://localhost:3000

---

## Option 3: Full Stack with Docker

**Time: 5 minutes**

Runs everything in containers - easiest for production-like setup.

### Prerequisites

- Docker Desktop installed

### Step 1: Start Everything

\`\`\`bash
docker-compose up -d
\`\`\`

### Step 2: Access Services

- **Dashboard:** http://localhost:3000
- **MLflow:** http://localhost:5000
- **Model API:** http://localhost:8000

### Step 3: Train a Model

\`\`\`bash
docker-compose exec mlflow python /app/scripts/train_model.py
\`\`\`

---

## What to Do Next

### Explore the Dashboard

1. **Home Page** - Overview metrics and recent activity
2. **Experiments** - View all training runs and compare results
3. **Models** - Browse model registry and versions
4. **Deployments** - Monitor production deployments
5. **Docs** - Read detailed documentation

### Try Making a Prediction

\`\`\`bash
curl -X POST http://localhost:3000/api/predict \
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

### Customize for Your Use Case

1. **Add your data:** Place CSV files in `data/raw/`
2. **Modify training:** Edit `scripts/train_model.py`
3. **Update dashboard:** Customize components in `components/`

---

## Common Commands

\`\`\`bash
# Start dashboard
npm run dev

# Start MLflow
mlflow server --host 0.0.0.0 --port 5000

# Train model
python scripts/train_model.py

# Run tests
npm test

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
\`\`\`

---

## Troubleshooting

### Dashboard won't start

\`\`\`bash
# Delete and reinstall
rm -rf node_modules
npm install
npm run dev
\`\`\`

### Port already in use

\`\`\`bash
# Use different port
PORT=3001 npm run dev
\`\`\`

### Python errors

\`\`\`bash
# Reinstall dependencies
pip install --upgrade -r requirements-ml.txt
\`\`\`

### Need more help?

See the [Troubleshooting Guide](./TROUBLESHOOTING.md)

---

## Next Steps

- Read the [Full Documentation](./GETTING_STARTED.md)
- Learn about [Experiment Tracking](./EXPERIMENT_TRACKING.md)
- Set up [CI/CD Pipelines](./CICD.md)
- Deploy to [Production](./DEPLOYMENT.md)

---

## Summary

**Fastest way to get started:**
\`\`\`bash
npm install && npm run dev
\`\`\`

**With model training:**
\`\`\`bash
pip install scikit-learn mlflow
mlflow server --host 0.0.0.0 --port 5000
python scripts/train_model.py
\`\`\`

**Full stack:**
\`\`\`bash
docker-compose up -d
\`\`\`

Choose the option that fits your needs and start building!
