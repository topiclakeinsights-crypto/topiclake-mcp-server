// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'topiclake-mcp-server-mcp/filtering';
import { Metadata, asTextContentResult } from 'topiclake-mcp-server-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import TopiclakeMcpServer from 'topiclake-mcp-server';

export const metadata: Metadata = {
  resource: 'policyinsights.us.export.api.v1',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/policyinsights/us/export/api/v1/topiclake_topics',
  operationId: 'topics_policyinsights_us_export_api_v1_topiclake_topics_get',
};

export const tool: Tool = {
  name: 'get_topiclake_topics_api_export_us_policyinsights_v1',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdvanced Topic Object Model, also knows as ATOM(Topiclake_Topic) in Topic Lake repositories are logical and human readable chunks of any given Federal Register document created by our TopiclakeAI technology. A document can contain multiple Atoms(Topics) in them. The filters remain the same as in \"/documents\"\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/v1_get_topiclake_topics_response',\n  $defs: {\n    v1_get_topiclake_topics_response: {\n      type: 'object',\n      title: 'AtomResponse',\n      properties: {\n        count: {\n          type: 'integer',\n          title: 'Count'\n        },\n        current_page: {\n          type: 'integer',\n          title: 'Current Page'\n        },\n        message: {\n          type: 'string',\n          title: 'Message'\n        },\n        next_page: {\n          type: 'integer',\n          title: 'Next Page'\n        },\n        previous_page: {\n          type: 'integer',\n          title: 'Previous Page'\n        },\n        status: {\n          type: 'string',\n          title: 'Status'\n        },\n        topiclake_topic_data: {\n          type: 'array',\n          title: 'Topiclake Topic Data',\n          items: {\n            type: 'object',\n            title: 'AtomData',\n            properties: {\n              id: {\n                type: 'string',\n                title: 'Id'\n              },\n              character_length: {\n                type: 'integer',\n                title: 'Character Length'\n              },\n              created_at: {\n                type: 'string',\n                title: 'Created At',\n                format: 'date-time'\n              },\n              description: {\n                type: 'string',\n                title: 'Description'\n              },\n              document_id: {\n                type: 'string',\n                title: 'Document Id'\n              },\n              document_name: {\n                type: 'string',\n                title: 'Document Name'\n              },\n              document_number: {\n                type: 'string',\n                title: 'Document Number'\n              },\n              extra_attributes: {\n                type: 'object',\n                title: 'ExtraAttributes',\n                properties: {\n                  parent: {\n                    type: 'array',\n                    title: 'Parent',\n                    items: {\n                      type: 'string'\n                    }\n                  },\n                  sort_number: {\n                    type: 'integer',\n                    title: 'Sort Number'\n                  }\n                },\n                required: [                  'parent',\n                  'sort_number'\n                ]\n              },\n              title: {\n                type: 'string',\n                title: 'Title'\n              },\n              updated_at: {\n                type: 'string',\n                title: 'Updated At',\n                format: 'date-time'\n              }\n            },\n            required: [              'id',\n              'character_length',\n              'created_at',\n              'description',\n              'document_id',\n              'document_name',\n              'document_number',\n              'extra_attributes',\n              'title',\n              'updated_at'\n            ]\n          }\n        },\n        total_count: {\n          type: 'integer',\n          title: 'Total Count'\n        },\n        total_pages: {\n          type: 'integer',\n          title: 'Total Pages'\n        },\n        publication_end_date: {\n          type: 'string',\n          title: 'Publication End Date',\n          format: 'date'\n        },\n        publication_start_date: {\n          type: 'string',\n          title: 'Publication Start Date',\n          format: 'date'\n        }\n      },\n      required: [        'count',\n        'current_page',\n        'message',\n        'next_page',\n        'previous_page',\n        'status',\n        'topiclake_topic_data',\n        'total_count',\n        'total_pages'\n      ]\n    }\n  }\n}\n```",
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
      document_id: {
        type: 'string',
        title: 'Document Id',
        description:
          'Limits the document associated with given document_id provided by TopicLake™ Technology',
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: TopiclakeMcpServer, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.policyinsights.us.export.api.v1.getTopiclakeTopics(body)),
  );
};

export default { metadata, tool, handler };
