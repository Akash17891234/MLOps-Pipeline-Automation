# Deployment Guide

Complete guide for deploying the MLOps pipeline to production.

## Deployment Options

1. Docker Compose (Local/Development)
2. Kubernetes (Production)
3. Cloud Platforms (AWS, GCP, Azure)
4. Vercel (Dashboard only)

## Docker Compose Deployment

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

### Steps

1. **Build images:**

\`\`\`bash
docker-compose build
\`\`\`

2. **Start services:**

\`\`\`bash
docker-compose up -d
\`\`\`

3. **Verify deployment:**

\`\`\`bash
docker-compose ps
docker-compose logs -f
\`\`\`

4. **Access services:**
- Dashboard: `http://localhost:3000`
- MLflow: `http://localhost:5000`
- Model API: `http://localhost:8000`

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster
- kubectl configured
- Helm 3.0+

### Deploy with Helm

\`\`\`bash
helm install mlops-pipeline ./helm/mlops-pipeline
\`\`\`

### Manual Deployment

\`\`\`bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mlflow.yaml
kubectl apply -f k8s/model-api.yaml
kubectl apply -f k8s/dashboard.yaml
\`\`\`

## Cloud Deployment

### AWS

Deploy using ECS or EKS:

\`\`\`bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker build -t mlops-pipeline .
docker tag mlops-pipeline:latest <account>.dkr.ecr.us-east-1.amazonaws.com/mlops-pipeline:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/mlops-pipeline:latest
\`\`\`

### Google Cloud

Deploy to Cloud Run:

\`\`\`bash
gcloud builds submit --tag gcr.io/PROJECT_ID/mlops-pipeline
gcloud run deploy mlops-pipeline --image gcr.io/PROJECT_ID/mlops-pipeline --platform managed
\`\`\`

### Azure

Deploy to Azure Container Instances:

\`\`\`bash
az container create --resource-group myResourceGroup --name mlops-pipeline --image myregistry.azurecr.io/mlops-pipeline:latest
\`\`\`

## Vercel Deployment

Deploy the dashboard to Vercel:

\`\`\`bash
vercel --prod
\`\`\`

Or use the Vercel GitHub integration for automatic deployments.

## Environment Variables

Configure these for production:

\`\`\`bash
# MLflow
MLFLOW_TRACKING_URI=https://mlflow.yourdomain.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/mlops

# Storage
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET=your-bucket

# Monitoring
SENTRY_DSN=your_sentry_dsn
\`\`\`

## Monitoring

Setup monitoring with:
- Prometheus for metrics
- Grafana for visualization
- Sentry for error tracking

## Scaling

### Horizontal Scaling

Scale model API replicas:

\`\`\`bash
kubectl scale deployment model-api --replicas=5
\`\`\`

### Auto-scaling

Configure HPA:

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: model-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: model-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

## Security

1. Enable HTTPS
2. Implement authentication
3. Use secrets management
4. Enable network policies
5. Regular security updates

## Backup & Recovery

Setup automated backups for:
- MLflow database
- Model artifacts
- Configuration files

## Troubleshooting

Common deployment issues and solutions in the documentation.
