

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { Angular2InjectionTokens } from 'pluginlib/inject-resources';

import {XhrBase} from './xhr-base';
import {DiscoveryTable} from '../meta-data/discovery-table';

export interface GetOptions {
  uri: string;
}

@Injectable()
export class DiscoveryTableService extends XhrBase<DiscoveryTable> {
  private url:string = '';

  constructor(
    public http: Http,
    @Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition) {
    super(http);
    this.url = ZoweZLUX.uriBroker.pluginRESTUri(pluginDefinition.getBasePlugin(), "data", "/zosDiscovery/naive");
  }

  getAll(getOptions: GetOptions): Observable<DiscoveryTable> {
    let url = `${this.url}/${getOptions.uri}`;

    let result = this.http
      .get(url, XhrBase.getHeaders())
      .map((response: Response) => response.json() as DiscoveryTable)
      .catch(XhrBase.handleError);

    return result as Observable<DiscoveryTable>;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

