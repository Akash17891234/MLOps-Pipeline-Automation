# Sample Demo Guide

## Quick Test (No Setup Required!)

### Option 1: Test the Dashboard (Easiest)

\`\`\`bash
# Install dependencies (first time only)
npm install

# Start the dashboard
npm run dev
\`\`\`

Then visit:
- **Main Dashboard**: http://localhost:3000
- **Test Page**: http://localhost:3000/test

The dashboard works immediately with mock data - no Python, no MLflow, no Docker needed!

---

## Option 2: Run the Python Demo

This runs a simple training simulation that shows the full workflow:

\`\`\`bash
# Run the demo script
python scripts/sample_demo.py
\`\`\`

**What it does:**
1. Trains 3 different models with different parameters
2. Compares their performance
3. Selects the best model
4. Makes sample predictions
5. Saves results to `demo_results.json`

**Sample Output:**
\`\`\`
============================================================
🎯 MLOps Pipeline - Sample Demo
============================================================

This demo will:
1. Train 3 different models
2. Compare their performance
3. Make sample predictions

============================================================

Press Enter to start training...

============================================================
🚀 Training Model: Random Forest
============================================================
📊 Parameters:
   - Model: Random Forest
   - Estimators: 100
   - Max Depth: 10

⏳ Training in progress...
   Epoch 1/5 █░░░░
   Epoch 2/5 ██░░░
   Epoch 3/5 ███░░
   Epoch 4/5 ████░
   Epoch 5/5 █████

📈 Results:
   - Accuracy:  0.9423
   - Precision: 0.9401
   - Recall:    0.9445
   - F1 Score:  0.9423

✅ Experiment 'Random Forest_experiment' completed!
   Run ID: run-001
\`\`\`

---

## Option 3: Test the API Directly

### Using curl:

\`\`\`bash
# Make a prediction
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "modelId": "customer-churn",
    "features": [5.1, 3.5, 1.4, 0.2]
  }'
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "prediction": "retain",
  "confidence": 0.9234,
  "modelId": "customer-churn",
  "modelVersion": "v2.1.0",
  "timestamp": "2024-10-01T10:30:00.000Z"
}
\`\`\`

### Using the Test Page:

1. Go to http://localhost:3000/test
2. Enter feature values (or use sample data)
3. Click "Get Prediction"
4. See results instantly!

---

## What Each Test Shows

### Dashboard Test
- ✅ Experiment tracking UI
- ✅ Model registry and versions
- ✅ Deployment monitoring
- ✅ Performance metrics visualization
- ✅ Real-time status updates

### Python Demo
- ✅ Model training workflow
- ✅ Parameter logging
- ✅ Metrics tracking
- ✅ Model comparison
- ✅ Prediction generation

### API Test
- ✅ REST API endpoints
- ✅ Request/response format
- ✅ Model versioning
- ✅ Confidence scores
- ✅ Error handling

---

## Next Steps After Testing

1. **Customize the Models**
   - Edit `scripts/sample_demo.py` to try different parameters
   - Add your own model types

2. **Connect Real MLflow**
   - Run `python scripts/setup_mlflow.py`
   - Update API routes to fetch from MLflow

3. **Add Your Own Data**
   - Replace mock data with your datasets
   - Train models on real problems

4. **Deploy to Production**
   - Use Docker: `docker-compose up`
   - Deploy to cloud platforms
   - Set up CI/CD pipelines

---

## Troubleshooting

### Dashboard won't start
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
\`\`\`

### Python demo errors
\`\`\`bash
# The demo has no dependencies!
# It uses built-in Python only
# Just run: python scripts/sample_demo.py
\`\`\`

### Port already in use
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

---

## Understanding the Results

### Accuracy Scores
- **> 0.95**: Excellent model performance
- **0.90-0.95**: Good performance
- **0.85-0.90**: Acceptable performance
- **< 0.85**: Needs improvement

### Confidence Scores
- **> 0.90**: High confidence prediction
- **0.80-0.90**: Moderate confidence
- **< 0.80**: Low confidence (use with caution)

### Latency
- **< 50ms**: Excellent for real-time
- **50-100ms**: Good for most applications
- **> 100ms**: May need optimization

---

## Demo Scenarios

### Scenario 1: Compare Model Versions
1. Run the Python demo multiple times
2. View results in the dashboard
3. Compare accuracy across runs
4. Select the best performing model

### Scenario 2: A/B Testing
1. Deploy two model versions
2. Send traffic to both
3. Monitor performance metrics
4. Promote the winner to production

### Scenario 3: Monitor Drift
1. Make predictions over time
2. Track accuracy trends
3. Detect when performance drops
4. Trigger retraining automatically

---

## Questions?

Check out:
- `README.md` - Full project overview
- `docs/GETTING_STARTED.md` - Detailed setup
- `docs/API_REFERENCE.md` - API documentation
- `docs/TROUBLESHOOTING.md` - Common issues
