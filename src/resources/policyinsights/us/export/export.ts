// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as APIAPI from './api/api';
import { API } from './api/api';

export class Export extends APIResource {
  api: APIAPI.API = new APIAPI.API(this._client);
}

Export.API = API;

export declare namespace Export {
  export { API as API };
}
