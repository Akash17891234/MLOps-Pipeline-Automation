# Troubleshooting Guide

This guide helps you resolve common issues when running the MLOps Pipeline.

## Quick Diagnosis

### Issue: "I can't run the pipeline"

**Most Common Causes:**
1. You're trying to run Python scripts without Python installed
2. You're trying to run the full stack without Docker
3. Missing dependencies

**Quick Solution:** Run the dashboard in demo mode (see below)

---

## Running in Demo Mode (Easiest)

The dashboard works **out of the box** without any external dependencies. Just run:

\`\`\`bash
# Install dependencies (one time only)
npm install

# Start the dashboard
npm run dev
\`\`\`

Open `http://localhost:3000` - Everything works with mock data!

**What works in demo mode:**
- ✅ Full dashboard UI
- ✅ All visualizations and charts
- ✅ Experiment tracking views
- ✅ Model registry
- ✅ Deployment monitoring
- ✅ API endpoints with mock data

**What doesn't work:**
- ❌ Actual model training
- ❌ Real MLflow integration
- ❌ Real predictions
- ❌ Data versioning with DVC

---

## Common Issues

### 1. Node.js Issues

#### Error: "command not found: npm"

**Solution:** Install Node.js

\`\`\`bash
# macOS
brew install node

# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Windows
# Download from https://nodejs.org
\`\`\`

Verify installation:
\`\`\`bash
node --version  # Should show v20 or higher
npm --version
\`\`\`

#### Error: "Module not found" or Import errors

**Solution:** Reinstall dependencies

\`\`\`bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

#### Error: Port 3000 already in use

**Solution:** Kill the process or use a different port

\`\`\`bash
# Find what's using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>

# Or use a different port
PORT=3001 npm run dev
\`\`\`

---

### 2. Python Issues (Only if running training scripts)

#### Error: "python: command not found"

**Solution:** Install Python 3.10+

\`\`\`bash
# macOS
brew install python@3.10

# Ubuntu/Debian
sudo apt update
sudo apt install python3.10 python3-pip

# Windows
# Download from https://python.org
\`\`\`

#### Error: "No module named 'sklearn'" or similar

**Solution:** Install Python dependencies

\`\`\`bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install scikit-learn pandas numpy mlflow
\`\`\`

#### Error: "MLflow server not running"

**You don't need MLflow for the dashboard!** The dashboard works with mock data.

If you want to run MLflow:

\`\`\`bash
# Install MLflow
pip install mlflow

# Start server
mlflow server --host 0.0.0.0 --port 5000
\`\`\`

---

### 3. Docker Issues (Only if using Docker)

#### Error: "docker: command not found"

**Solution:** Install Docker

\`\`\`bash
# macOS
brew install --cask docker

# Ubuntu
sudo apt install docker.io docker-compose

# Windows
# Download Docker Desktop from docker.com
\`\`\`

#### Error: "Cannot connect to Docker daemon"

**Solution:** Start Docker

\`\`\`bash
# macOS/Windows
# Open Docker Desktop application

# Linux
sudo systemctl start docker
\`\`\`

#### Error: "Port already allocated"

**Solution:** Stop conflicting containers

\`\`\`bash
# See running containers
docker ps

# Stop all containers
docker-compose down

# Or stop specific container
docker stop <container-id>
\`\`\`

---

### 4. GitHub Actions Issues

#### Error: "Workflow not running"

**Causes:**
- Secrets not configured
- Workflow file syntax error
- Branch protection rules

**Solution:**

1. Check secrets are set in GitHub Settings → Secrets
2. Validate YAML syntax: https://www.yamllint.com/
3. Check workflow logs in GitHub Actions tab

#### Error: "Authentication failed"

**Solution:** Add required secrets

Go to GitHub repo → Settings → Secrets → Actions:

\`\`\`
DOCKER_USERNAME=your-username
DOCKER_PASSWORD=your-token
MLFLOW_TRACKING_URI=http://your-mlflow-server:5000
\`\`\`

---

### 5. API Issues

#### Error: "Failed to fetch" in browser console

**Cause:** API route not found or CORS issue

**Solution:**

1. Check the API route exists:
\`\`\`bash
ls app/api/experiments/route.ts
\`\`\`

2. Restart the dev server:
\`\`\`bash
npm run dev
\`\`\`

3. Check browser console for detailed error

#### Error: 404 on API calls

**Solution:** Verify the API route path

\`\`\`typescript
// Correct
const response = await fetch('/api/experiments')

// Wrong
const response = await fetch('/experiments')
\`\`\`

---

### 6. Build/Deployment Issues

#### Error: "Build failed" on Vercel

**Common causes:**
- TypeScript errors
- Missing environment variables
- Build timeout

**Solution:**

1. Test build locally:
\`\`\`bash
npm run build
\`\`\`

2. Fix any TypeScript errors shown

3. Add environment variables in Vercel dashboard

#### Error: "Module not found" in production

**Solution:** Check imports use correct paths

\`\`\`typescript
// Use absolute imports
import { Button } from '@/components/ui/button'

// Not relative imports from wrong location
import { Button } from '../../../components/ui/button'
\`\`\`

---

## Performance Issues

### Dashboard is slow

**Solutions:**

1. **Clear browser cache**
   - Chrome: Cmd/Ctrl + Shift + Delete
   - Select "Cached images and files"

2. **Reduce data points in charts**
   - Edit mock data to have fewer entries

3. **Check browser console for errors**
   - Fix any JavaScript errors shown

### High memory usage

**Solution:** Restart the dev server

\`\`\`bash
# Stop server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
\`\`\`

---

## Getting More Help

### Before asking for help, collect this info:

1. **What are you trying to do?**
   - Run the dashboard only?
   - Train models?
   - Deploy to production?

2. **What command did you run?**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **What error did you see?**
   - Copy the full error message
   - Include stack trace if available

4. **Your environment:**
   \`\`\`bash
   node --version
   npm --version
   # If using Python:
   python --version
   \`\`\`

### Where to get help:

- Check this troubleshooting guide first
- Read the [Quick Start Guide](./QUICK_START.md)
- Search existing GitHub issues
- Open a new GitHub issue with the info above

---

## Quick Reference

### Just want to see the dashboard?

\`\`\`bash
npm install
npm run dev
\`\`\`
Open `http://localhost:3000`

### Want to train models?

\`\`\`bash
# Install Python dependencies
pip install scikit-learn pandas numpy mlflow

# Run training
python scripts/train_model.py
\`\`\`

### Want the full stack?

\`\`\`bash
# Use Docker
docker-compose up -d
\`\`\`

### Want to deploy?

\`\`\`bash
# Deploy to Vercel
vercel --prod
\`\`\`

---

## Still Having Issues?

If none of these solutions work:

1. **Start fresh:**
   \`\`\`bash
   # Delete everything
   rm -rf node_modules .next
   
   # Reinstall
   npm install
   
   # Try again
   npm run dev
   \`\`\`

2. **Use demo mode:** The dashboard works perfectly with mock data - no external dependencies needed!

3. **Open an issue:** Include your error message, what you tried, and your environment info.
