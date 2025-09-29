import asyncio
import json
import os
from typing import Any, Dict, List, Optional
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="TopicLake MCP Server", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Bearer token from environment variable
BEARER_TOKEN = os.getenv("TOPICLAKE_POLICY_MCP_API_KEY")
if not BEARER_TOKEN:
    raise ValueError("TOPICLAKE_BEARER_TOKEN environment variable is required")

BASE_URL = "https://app.topiclake.com/policyinsights/us/export/api/v1"

async def make_api_request(endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """Make request to TopicLake API"""
    headers = {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Content-Type": "application/json"
    }

    # Remove None values from params
    clean_params = {k: v for k, v in params.items() if v is not None}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{BASE_URL}{endpoint}", params=clean_params, headers=headers)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")

@app.get("/")
async def root():
    return {"message": "TopicLake MCP Server is running!", "status": "healthy"}

@app.post("/")
async def post_root():
    return {"message": "TopicLake MCP Server is running!", "status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/mcp/tools/get_documents")
async def get_documents(params: Dict[str, Any]):
    """Get documents from TopicLake API"""
    result = await make_api_request("/documents", params)
    return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}

@app.post("/mcp/tools/get_topiclake_topics")
async def get_topiclake_topics(params: Dict[str, Any]):
    """Get TopicLake topics"""
    result = await make_api_request("/topiclake_topics", params)
    return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}

@app.post("/mcp/tools/get_qna")
async def get_qna(params: Dict[str, Any]):
    """Get Q&A pairs from TopicLake"""
    result = await make_api_request("/qna", params)
    return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}

@app.post("/mcp/tools/get_sentiment")
async def get_sentiment(params: Dict[str, Any]):
    """Get sentiment analysis from TopicLake"""
    result = await make_api_request("/sentiment", params)
    return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}

@app.post("/mcp/tools/get_summary")
async def get_summary(params: Dict[str, Any]):
    """Get document summaries from TopicLake"""
    result = await make_api_request("/summary", params)
    return {"content": [{"type": "text", "text": json.dumps(result, indent=2)}]}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
