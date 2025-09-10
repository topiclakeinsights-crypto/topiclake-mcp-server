#!/bin/bash
# Deploy to Google Cloud Run

# Set your project ID (replace with your actual project ID)
PROJECT_ID="topiclake-mcp"
SERVICE_NAME="topiclake-mcp-server"
REGION="us-central1"

# Build and deploy
gcloud run deploy $SERVICE_NAME \
    --source . \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars TOPICLAKE_BEARER_TOKEN="YOUR_BEARER_TOKEN_HERE" \
    --project $PROJECT_ID

echo "Deployment complete!"
echo "Your server URL will be shown above"
