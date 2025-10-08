// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from 'topiclake-mcp-server';

export const parseAuthHeaders = (req: IncomingMessage): Partial<ClientOptions> => {
  const apiKey =
    Array.isArray(req.headers['x-topiclake-mcp-server-api-key']) ?
      req.headers['x-topiclake-mcp-server-api-key'][0]
    : req.headers['x-topiclake-mcp-server-api-key'];
  return { apiKey };
};
