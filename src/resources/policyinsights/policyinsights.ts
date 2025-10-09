// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as UsAPI from './us/us';
import { Us } from './us/us';

export class Policyinsights extends APIResource {
  us: UsAPI.Us = new UsAPI.Us(this._client);
}

Policyinsights.Us = Us;

export declare namespace Policyinsights {
  export { Us as Us };
}
