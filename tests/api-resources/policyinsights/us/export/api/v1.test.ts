// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import TopiclakeMcpServer from 'topiclake-mcp-server';

const client = new TopiclakeMcpServer({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v1', () => {
  // Prism tests are disabled
  test.skip('getAgency', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getAgency();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getAgency: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getAgency(
        { include_partials: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getClassification', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getClassification();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getClassification: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getClassification(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getDocuments', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getDocuments();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getDocuments: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getDocuments(
        {
          id: 'id',
          agency_id: [0],
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getEntity', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getEntity();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getEntity: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getEntity(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getFrDesignatedTopics', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getFrDesignatedTopics();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getKeyword', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getKeyword();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getKeyword: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getKeyword(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getQna', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getQna();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getQna: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getQna(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getRegBrief', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getRegBrief();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getRegBrief: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getRegBrief(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getSentiment', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getSentiment();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getSentiment: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getSentiment(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getSummary', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getSummary();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getSummary: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getSummary(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topiclake_topic_id: 'topiclake_topic_id',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getTopiclakeTopics', async () => {
    const responsePromise = client.policyinsights.us.export.api.v1.getTopiclakeTopics();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getTopiclakeTopics: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.policyinsights.us.export.api.v1.getTopiclakeTopics(
        {
          id: 'id',
          agency_id: [0],
          document_id: 'document_id',
          document_number: ['string'],
          page_number: 1,
          page_size: 1,
          publication_end_date: '2019-12-27',
          publication_start_date: '2019-12-27',
          topics: ['string'],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(TopiclakeMcpServer.NotFoundError);
  });
});
