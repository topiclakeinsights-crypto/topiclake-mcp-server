// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { TopiclakeMcpServer } from '../client';

export abstract class APIResource {
  protected _client: TopiclakeMcpServer;

  constructor(client: TopiclakeMcpServer) {
    this._client = client;
  }
}
