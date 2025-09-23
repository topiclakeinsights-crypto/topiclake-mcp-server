import asyncio
import json
import os
from typing import Any, Dict, List, Optional
import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

print("--- SCRIPT START ---")

app = FastAPI(title="TopicLake MCP Server", version="1.0.0")

print("--- FASTAPI APP CREATED ---")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Bearer token from environment variable
BEARER_TOKEN = os.getenv("TOPICLAKE_BEARER_TOKEN")
if not BEARER_TOKEN:
    raise ValueError("TOPICLAKE_BEARER_TOKEN environment variable is required")

BASE_URL = "https://app.topiclake.com/policyinsights/us/export/api/v1"

# MCP Request/Response Models
class MCPRequest(BaseModel):
    method: str
    params: Optional[Dict[str, Any]] = None

class MCPToolCall(BaseModel):
    name: str
    arguments: Optional[Dict[str, Any]] = None

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

# MCP Protocol Endpoints
@app.get("/mcp/tools")
@app.post("/mcp/tools")
async def list_tools():
    """List available MCP tools"""
    return {
        "tools": [
            {
                "name": "get_documents",
                "description": "Get documents from TopicLake API. Use parameters like limit, offset, search terms, etc.",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "limit": {"type": "integer", "description": "Number of documents to return"},
                        "offset": {"type": "integer", "description": "Offset for pagination"},
                        "search": {"type": "string", "description": "Search term"},
                        "date_from": {"type": "string", "description": "Start date (YYYY-MM-DD)"},
                        "date_to": {"type": "string", "description": "End date (YYYY-MM-DD)"}
                    }
                }
            },
            {
                "name": "get_topiclake_topics",
                "description": "Get TopicLake topics and categories",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "limit": {"type": "integer", "description": "Number of topics to return"},
                        "category": {"type": "string", "description": "Topic category filter"}
                    }
                }
            },
            {
                "name": "get_qna",
                "description": "Get Q&A pairs from TopicLake",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "document_id": {"type": "string", "description": "Document ID"},
                        "limit": {"type": "integer", "description": "Number of Q&A pairs to return"}
                    }
                }
            },
            {
                "name": "get_sentiment",
                "description": "Get sentiment analysis from TopicLake",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "document_id": {"type": "string", "description": "Document ID"},
                        "text": {"type": "string", "description": "Text to analyze"}
                    }
                }
            },
            {
                "name": "get_summary",
                "description": "Get document summaries from TopicLake",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "document_id": {"type": "string", "description": "Document ID"},
                        "summary_type": {"type": "string", "description": "Type of summary"}
                    }
                }
            }
        ]
    }

@app.post("/mcp/tools/call")
async def call_tool(request: MCPToolCall):
    """Call a specific MCP tool"""
    tool_name = request.name
    arguments = request.arguments or {}
    
    try:
        if tool_name == "get_documents":
            result = await make_api_request("/documents", arguments)
            return {
                "content": [
                    {
                        "type": "text",
                        "text": f"Found {len(result.get('data', []))} documents"
                    },
                    {
                        "type": "json",
                        "json": result
                    }
                ]
            }
        
        elif tool_name == "get_topiclake_topics":
            result = await make_api_request("/topiclake_topics", arguments)
            return {
                "content": [
                    {
                        "type": "text", 
                        "text": f"Found {len(result.get('data', []))} topics"
                    },
                    {
                        "type": "json",
                        "json": result
                    }
                ]
            }
        
        elif tool_name == "get_qna":
            result = await make_api_request("/qna", arguments)
            return {
                "content": [
                    {
                        "type": "text",
                        "text": f"Found {len(result.get('data', []))} Q&A pairs"
                    },
                    {
                        "type": "json",
                        "json": result
                    }
                ]
            }
        
        elif tool_name == "get_sentiment":
            result = await make_api_request("/sentiment", arguments)
            return {
                "content": [
                    {
                        "type": "text",
                        "text": "Sentiment analysis completed"
                    },
                    {
                        "type": "json",
                        "json": result
                    }
                ]
            }
        
        elif tool_name == "get_summary":
            result = await make_api_request("/summary", arguments)
            return {
                "content": [
                    {
                        "type": "text",
                        "text": "Summary generated"
                    },
                    {
                        "type": "json",
                        "json": result
                    }
                ]
            }
        
        else:
            raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tool execution failed: {str(e)}")

# Legacy endpoints for backward compatibility
@app.post("/mcp/tools/get_documents")
async def get_documents_legacy(request: Request):
    """Legacy endpoint - Get documents from TopicLake API"""
    body = await request.json()
    params = body.get("arguments", body)
    result = await make_api_request("/documents", params)
    return {"content": [{"type": "json", "json": result}]}

@app.post("/mcp/tools/get_topiclake_topics")
async def get_topiclake_topics_legacy(request: Request):
    """Legacy endpoint - Get TopicLake topics"""
    body = await request.json()
    params = body.get("arguments", body)
    result = await make_api_request("/topiclake_topics", params)
    return {"content": [{"type": "json", "json": result}]}

@app.post("/mcp/tools/get_qna")
async def get_qna_legacy(request: Request):
    """Legacy endpoint - Get Q&A pairs from TopicLake"""
    body = await request.json()
    params = body.get("arguments", body)
    result = await make_api_request("/qna", params)
    return {"content": [{"type": "json", "json": result}]}

@app.post("/mcp/tools/get_sentiment")
async def get_sentiment_legacy(request: Request):
    """Legacy endpoint - Get sentiment analysis from TopicLake"""
    body = await request.json()
    params = body.get("arguments", body)
    result = await make_api_request("/sentiment", params)
    return {"content": [{"type": "json", "json": result}]}

@app.post("/mcp/tools/get_summary")
async def get_summary_legacy(request: Request):
    """Legacy endpoint - Get document summaries from TopicLake"""
    body = await request.json()
    params = body.get("arguments", body)
    result = await make_api_request("/summary", params)
    return {"content": [{"type": "json", "json": result}]}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print(f"--- STARTING SERVER ON PORT {port} ---")
    uvicorn.run(app, host="0.0.0.0", port=port)
