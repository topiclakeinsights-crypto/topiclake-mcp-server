import asyncio
import json
import os
from typing import Any, Dict, List, Optional
import httpx
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel, Field

# --- SCRIPT START ---
print("--- SCRIPT START ---")

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
BEARER_TOKEN = os.getenv("TOPICLAKE_BEARER_TOKEN")
if not BEARER_TOKEN:
    raise ValueError("TOPICLAKE_BEARER_TOKEN environment variable is required")

BASE_URL = "https://app.topiclake.com/policyinsights/us/export/api/v1"

async def make_api_request(endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
    """Make request to TopicLake API"""
    headers = {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Content-Type": "application/json"
    }
    clean_params = {k: v for k, v in params.items() if v is not None}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{BASE_URL}{endpoint}", params=clean_params, headers=headers)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")


class McpRequest(BaseModel):
    jsonrpc: str = "2.0"
    method: str
    params: Any
    id: Optional[str] = None

class McpResponse(BaseModel):
    jsonrpc: str = "2.0"
    result: Any
    id: Optional[str] = None

class ParametersSchema(BaseModel):
    type: str = "object"
    properties: Dict[str, Any]
    required: List[str]

class ToolSchema(BaseModel):
    name: str
    description: str
    inputSchema: ParametersSchema

# --- TOOL FUNCTIONS ---
async def get_documents(params: Dict[str, Any]):
    return await make_api_request("/documents", params)

async def get_topiclake_topics(params: Dict[str, Any]):
    return await make_api_request("/topiclake_topics", params)

async def get_fr_designated_topics(params: Dict[str, Any]):
    return await make_api_request("/fr_designated_topics", params)

async def get_agency(params: Dict[str, Any]):
    return await make_api_request("/agency", params)

async def get_qna(params: Dict[str, Any]):
    return await make_api_request("/qna", params)

async def get_sentiment(params: Dict[str, Any]):
    return await make_api_request("/sentiment", params)

async def get_summary(params: Dict[str, Any]):
    return await make_api_request("/summary", params)

async def get_classification(params: Dict[str, Any]):
    return await make_api_request("/classification", params)

async def get_keyword(params: Dict[str, Any]):
    return await make_api_request("/keyword", params)

async def get_entity(params: Dict[str, Any]):
    return await make_api_request("/entity", params)

async def get_reg_brief(params: Dict[str, Any]):
    return await make_api_request("/reg_brief", params)

# --- TOOL REGISTRY AND SCHEMAS ---
tool_registry = {
    "tools/get_documents": get_documents,
    "tools/get_topiclake_topics": get_topiclake_topics,
    "tools/get_fr_designated_topics": get_fr_designated_topics,
    "tools/get_agency": get_agency,
    "tools/get_qna": get_qna,
    "tools/get_sentiment": get_sentiment,
    "tools/get_summary": get_summary,
    "tools/get_classification": get_classification,
    "tools/get_keyword": get_keyword,
    "tools/get_entity": get_entity,
    "tools/get_reg_brief": get_reg_brief,
}

tool_schemas = {
    "tools/get_documents": {
        "description": "Retrieve Federal Register documents from the TopicLake repository with filters.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Document ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of documents to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_topiclake_topics": {
        "description": "Get TopicLake™ Topic Objects from documents.",
        "parameters": {
            "type": "object",
            "properties": {
                "document_id": {"type": "string", "description": "Document ID."},
                "id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of documents to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_fr_designated_topics": {
        "description": "Get a list of all Federal Register designated topics.",
        "parameters": {"type": "object", "properties": {}, "required": []}
    },
    "tools/get_agency": {
        "description": "Get a list of all agencies that publish to the Federal Register.",
        "parameters": {
            "type": "object",
            "properties": {
                "include_partials": {"type": "boolean", "description": "Include partial agencies in the list."}
            },
            "required": []
        }
    },
    "tools/get_qna": {
        "description": "Get AI-generated questions and answers for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "document_id": {"type": "string", "description": "Document ID."},
                "id": {"type": "string", "description": "Q&A ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_sentiment": {
        "description": "Get AI-generated sentiment analysis for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Sentiment ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_summary": {
        "description": "Get AI-generated summaries for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Summary ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_classification": {
        "description": "Get AI-generated classifications for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Classification ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_keyword": {
        "description": "Get AI-generated keywords for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Keyword ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_entity": {
        "description": "Get AI-generated named entities for a given document or topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Entity ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "topiclake_topic_id": {"type": "string", "description": "Topic ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
    "tools/get_reg_brief": {
        "description": "Get AI-generated regulatory briefs and key insights for a given document.",
        "parameters": {
            "type": "object",
            "properties": {
                "id": {"type": "string", "description": "Reg Brief ID."},
                "document_id": {"type": "string", "description": "Document ID."},
                "document_number": {"type": "array", "items": {"type": "string"}, "description": "Federal Register document number."},
                "topics": {"type": "array", "items": {"type": "string"}, "description": "Topics to filter by."},
                "agency_id": {"type": "array", "items": {"type": "integer"}, "description": "Agencies to filter by."},
                "page_number": {"type": "integer", "description": "Page number of the result set."},
                "page_size": {"type": "integer", "description": "Number of items to return per page."},
                "publication_start_date": {"type": "string", "description": "Find documents published on or after a given date (YYYY-MM-DD)."},
                "publication_end_date": {"type": "string", "description": "Find documents published on or before a given date (YYYY-MM-DD)."}
            },
            "required": []
        }
    },
}

# --- ENDPOINTS ---
@app.get("/")
async def root():
    return {"message": "TopicLake MCP Server is running!", "status": "healthy"}

@app.post("/mcp")
async def mcp_dispatcher(request_body: McpRequest):
    if request_body.method in tool_registry:
        tool_function = tool_registry[request_body.method]
        try:
            result = await tool_function(request_body.params)
            return McpResponse(id=request_body.id, result=result)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Tool execution failed: {str(e)}")
    else:
        raise HTTPException(status_code=404, detail=f"Method not found: {request_body.method}")

@app.post("/tools/list")
async def list_tools():
    tools_list = []
    for name, schema in tool_schemas.items():
        tools_list.append(ToolSchema(
            name=name,
            description=schema["description"],
            inputSchema=ParametersSchema(**schema["parameters"])
        ))
    return {"tools": tools_list}

@app.post("/health")
async def post_health():
    return {"status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
