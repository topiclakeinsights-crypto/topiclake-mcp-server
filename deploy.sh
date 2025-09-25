#!/bin/bash
# Deploy to Google Cloud Run

# Set your project ID (replace with your actual project ID)
PROJECT_ID="topiclake-insights-engine"
SERVICE_NAME="topiclake-mcp-server"
REGION="us-east1"

# Build and deploy
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars TOPICLAKE_BEARER_TOKEN="your-secret-name:latest" \
    --project $PROJECT_ID

echo "Deployment complete!"
echo "Your server URL will be shown above"
