# Topiclake Mcp Server TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:topiclakeinsights-crypto/topiclake-mcp-server.git
cd topiclake-mcp-server
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export TOPICLAKE_MCP_SERVER_API_KEY="My API Key"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npx -y topiclake-mcp-server-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "topiclake_mcp_server_api": {
      "command": "node",
      "args": ["/path/to/local/topiclake-mcp-server/packages/mcp-server", "--client=claude", "--tools=all"],
      "env": {
        "TOPICLAKE_MCP_SERVER_API_KEY": "My API Key"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| -------------------------------- | ------------------------ | --------------- |
| `x-topiclake-mcp-server-api-key` | `apiKey` | APIKeyHeader |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "topiclake_mcp_server_api": {
      "url": "http://localhost:3000",
      "headers": {
        "x-topiclake-mcp-server-api-key": "My API Key"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "topiclake-mcp-server-mcp/server";

// import a specific tool
import getAgencyAPIExportUsPolicyinsightsV1 from "topiclake-mcp-server-mcp/tools/policyinsights/us/export/api/v1/get-agency-api-export-us-policyinsights-v1";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [getAgencyAPIExportUsPolicyinsightsV1, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `policyinsights.us.export.api.v1`:

- `get_agency_api_export_us_policyinsights_v1` (`read`): This endpoint returns all the agencies that publish to the Federal Register currently in the Topic Lake repository
- `get_classification_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our topiclakeAI, the AI generates all possible classifications based on the topic. Useful in creating your own search network, text annotation etc. Each Classification can be traced back to its parent Federal Register Document for verification
- `get_documents_api_export_us_policyinsights_v1` (`read`): An endpoint to retrieve Federal Register documents present in the Topic Lake repository with all important filters like publishing agency id or Federal Register designated topics at the time of publishing
- `get_entity_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our TopiclakeAI, multiple named entities are detected. Useful in creating your own annotated data network and search optimizations. Each Entity can be traced back to its parent Federal Register Document for verification
- `get_fr_designated_topics_api_export_us_policyinsights_v1` (`read`): The Federal Register sometimes publishes documents that also have annotated keywords called topics, this is not to be confused with Topiclake_Topics from the Topic Lake Repository. This route displays all the Federal Register designated topics
- `get_keyword_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our TopiclakeAI, the AI generates all possible keywords based on the topic. Useful in creating your own search network, text annotation etc. Each Keyword can be traced back to its parent Federal Register Document for verification
- `get_qna_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our TopiclakeAI, multiple questions and answers on the given context are generated. Useful in creating your own knowledge base and training data. Each QnA can be traced back to its parent Federal Register Document for verification
- `get_reg_brief_api_export_us_policyinsights_v1` (`read`): Based on the summaries generated by our TopiclakeAI, the AI provides concise document briefs and key insights. Useful in creating annotated data networks, summarizing information, and enhancing search optimizations. Each Insight can be traced back to its parent Federal Register Document for verification.
- `get_sentiment_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our TopiclakeAI, a sentiment on the given topic is generated. Useful in creating your own knowledge base and training data. Each Sentiment can be traced back to its parent Federal Register Document for verification
- `get_summary_api_export_us_policyinsights_v1` (`read`): Based on the Atoms(Topics) generated by our TopiclakeAI, three types of summaries are generated on the topic. Useful in creating your own knowledge base and training data. Each Summary can be traced back to its parent Federal Register Document for verification
- `get_topiclake_topics_api_export_us_policyinsights_v1` (`read`): Advanced Topic Object Model, also knows as ATOM(Topiclake_Topic) in Topic Lake repositories are logical and human readable chunks of any given Federal Register document created by our TopiclakeAI technology. A document can contain multiple Atoms(Topics) in them. The filters remain the same as in "/documents"
