// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'topiclake-mcp-server-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import TopiclakeMcpServer from 'topiclake-mcp-server';

export const metadata: Metadata = {
  resource: 'policyinsights.us.export.api.v1',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/policyinsights/us/export/api/v1/documents',
  operationId: 'documents_policyinsights_us_export_api_v1_documents_get',
};

export const tool: Tool = {
  name: 'get_documents_api_export_us_policyinsights_v1',
  description:
    'An endpoint to retrieve Federal Register documents present in the Topic Lake repository with all important filters like publishing agency id or Federal Register designated topics at the time of publishing',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        title: 'Id',
        description: 'Limit the documents associated with given ID from TopicLake™ Technology',
      },
      agency_id: {
        type: 'array',
        title: 'Agency Id',
        description: 'Limit to documents associated with particular agencies',
        items: {
          type: 'integer',
        },
      },
      document_number: {
        type: 'array',
        title: 'Document Number',
        description: 'Federal Register document number',
        items: {
          type: 'string',
        },
      },
      page_number: {
        type: 'integer',
        title: 'Page Number',
        description: 'The page of the result set',
      },
      page_size: {
        type: 'integer',
        title: 'Page Size',
        description: 'How many documents to return at once',
      },
      publication_end_date: {
        type: 'string',
        title: 'Publication End Date',
        description: 'Find documents published on or before a given date (YYYY-MM-DD)',
        format: 'date',
      },
      publication_start_date: {
        type: 'string',
        title: 'Publication Start Date',
        description: 'Find documents published on or after a given date (YYYY-MM-DD)',
        format: 'date',
      },
      topics: {
        type: 'array',
        title: 'Topics',
        description: 'Limit to documents associated with particular topics',
        items: {
          type: 'string',
        },
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: TopiclakeMcpServer, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.policyinsights.us.export.api.v1.getDocuments(body));
};

export default { metadata, tool, handler };
