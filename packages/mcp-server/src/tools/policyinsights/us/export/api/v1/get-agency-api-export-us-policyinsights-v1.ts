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
  httpPath: '/policyinsights/us/export/api/v1/agency',
  operationId: 'agency_policyinsights_us_export_api_v1_agency_get',
};

export const tool: Tool = {
  name: 'get_agency_api_export_us_policyinsights_v1',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint returns all the agencies that publish to the Federal Register currently in the Topic Lake repository\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'AgencyResponse',\n  properties: {\n    agencies: {\n      type: 'array',\n      title: 'Agencies',\n      items: {\n        type: 'object',\n        title: 'AgencyData',\n        properties: {\n          agency_id: {\n            type: 'integer',\n            title: 'Agency Id'\n          },\n          agency_name: {\n            type: 'string',\n            title: 'Agency Name'\n          },\n          short_name: {\n            type: 'string',\n            title: 'Short Name'\n          },\n          logo: {\n            type: 'string',\n            title: 'Logo'\n          }\n        },\n        required: [          'agency_id',\n          'agency_name',\n          'short_name'\n        ]\n      }\n    },\n    count: {\n      type: 'integer',\n      title: 'Count'\n    },\n    status: {\n      type: 'string',\n      title: 'Status'\n    }\n  },\n  required: [    'agencies',\n    'count',\n    'status'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      include_partials: {
        type: 'boolean',
        title: 'Include Partials',
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
    await maybeFilter(jq_filter, await client.policyinsights.us.export.api.v1.getAgency(body)),
  );
};

export default { metadata, tool, handler };
