// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../core/resource';
import * as V1API from './v1';
import {
  V1,
  V1GetAgencyParams,
  V1GetAgencyResponse,
  V1GetClassificationParams,
  V1GetClassificationResponse,
  V1GetDocumentsParams,
  V1GetDocumentsResponse,
  V1GetEntityParams,
  V1GetEntityResponse,
  V1GetFrDesignatedTopicsResponse,
  V1GetKeywordParams,
  V1GetKeywordResponse,
  V1GetQnaParams,
  V1GetQnaResponse,
  V1GetRegBriefParams,
  V1GetRegBriefResponse,
  V1GetSentimentParams,
  V1GetSentimentResponse,
  V1GetSummaryParams,
  V1GetSummaryResponse,
  V1GetTopiclakeTopicsParams,
  V1GetTopiclakeTopicsResponse,
} from './v1';

export class API extends APIResource {
  v1: V1API.V1 = new V1API.V1(this._client);
}

API.V1 = V1;

export declare namespace API {
  export {
    V1 as V1,
    type V1GetAgencyResponse as V1GetAgencyResponse,
    type V1GetClassificationResponse as V1GetClassificationResponse,
    type V1GetDocumentsResponse as V1GetDocumentsResponse,
    type V1GetEntityResponse as V1GetEntityResponse,
    type V1GetFrDesignatedTopicsResponse as V1GetFrDesignatedTopicsResponse,
    type V1GetKeywordResponse as V1GetKeywordResponse,
    type V1GetQnaResponse as V1GetQnaResponse,
    type V1GetRegBriefResponse as V1GetRegBriefResponse,
    type V1GetSentimentResponse as V1GetSentimentResponse,
    type V1GetSummaryResponse as V1GetSummaryResponse,
    type V1GetTopiclakeTopicsResponse as V1GetTopiclakeTopicsResponse,
    type V1GetAgencyParams as V1GetAgencyParams,
    type V1GetClassificationParams as V1GetClassificationParams,
    type V1GetDocumentsParams as V1GetDocumentsParams,
    type V1GetEntityParams as V1GetEntityParams,
    type V1GetKeywordParams as V1GetKeywordParams,
    type V1GetQnaParams as V1GetQnaParams,
    type V1GetRegBriefParams as V1GetRegBriefParams,
    type V1GetSentimentParams as V1GetSentimentParams,
    type V1GetSummaryParams as V1GetSummaryParams,
    type V1GetTopiclakeTopicsParams as V1GetTopiclakeTopicsParams,
  };
}
