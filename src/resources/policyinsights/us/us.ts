// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ExportAPI from './export/export';
import { Export } from './export/export';

export class Us extends APIResource {
  export: ExportAPI.Export = new ExportAPI.Export(this._client);
}

Us.Export = Export;

export declare namespace Us {
  export { Export as Export };
}
