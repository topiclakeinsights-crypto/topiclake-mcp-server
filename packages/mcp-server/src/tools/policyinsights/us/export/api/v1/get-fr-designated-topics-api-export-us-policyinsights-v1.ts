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
  httpPath: '/policyinsights/us/export/api/v1/fr_designated_topics',
  operationId: 'fr_topics_policyinsights_us_export_api_v1_fr_designated_topics_get',
};

export const tool: Tool = {
  name: 'get_fr_designated_topics_api_export_us_policyinsights_v1',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThe Federal Register sometimes publishes documents that also have annotated keywords called topics, this is not to be confused with Topiclake_Topics from the Topic Lake Repository. This route displays all the Federal Register designated topics\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/v1_get_fr_designated_topics_response',\n  $defs: {\n    v1_get_fr_designated_topics_response: {\n      type: 'object',\n      title: 'FrDesignedTopicResponse',\n      properties: {\n        count: {\n          type: 'integer',\n          title: 'Count'\n        },\n        fr_designated_topics: {\n          type: 'array',\n          title: 'Fr Designated Topics',\n          items: {\n            type: 'string'\n          }\n        },\n        status: {\n          type: 'string',\n          title: 'Status'\n        }\n      },\n      required: [        'count',\n        'fr_designated_topics',\n        'status'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
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
  const { jq_filter } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.policyinsights.us.export.api.v1.getFrDesignatedTopics()),
  );
};

export default { metadata, tool, handler };
