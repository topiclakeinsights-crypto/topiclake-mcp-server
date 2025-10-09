// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import get_agency_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-agency-api-export-us-policyinsights-v1';
import get_classification_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-classification-api-export-us-policyinsights-v1';
import get_documents_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-documents-api-export-us-policyinsights-v1';
import get_entity_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-entity-api-export-us-policyinsights-v1';
import get_fr_designated_topics_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-fr-designated-topics-api-export-us-policyinsights-v1';
import get_keyword_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-keyword-api-export-us-policyinsights-v1';
import get_qna_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-qna-api-export-us-policyinsights-v1';
import get_reg_brief_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-reg-brief-api-export-us-policyinsights-v1';
import get_sentiment_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-sentiment-api-export-us-policyinsights-v1';
import get_summary_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-summary-api-export-us-policyinsights-v1';
import get_topiclake_topics_api_export_us_policyinsights_v1 from './policyinsights/us/export/api/v1/get-topiclake-topics-api-export-us-policyinsights-v1';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(get_agency_api_export_us_policyinsights_v1);
addEndpoint(get_classification_api_export_us_policyinsights_v1);
addEndpoint(get_documents_api_export_us_policyinsights_v1);
addEndpoint(get_entity_api_export_us_policyinsights_v1);
addEndpoint(get_fr_designated_topics_api_export_us_policyinsights_v1);
addEndpoint(get_keyword_api_export_us_policyinsights_v1);
addEndpoint(get_qna_api_export_us_policyinsights_v1);
addEndpoint(get_reg_brief_api_export_us_policyinsights_v1);
addEndpoint(get_sentiment_api_export_us_policyinsights_v1);
addEndpoint(get_summary_api_export_us_policyinsights_v1);
addEndpoint(get_topiclake_topics_api_export_us_policyinsights_v1);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
