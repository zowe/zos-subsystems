

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {XhrBase} from './xhr-base';

export interface Plugin {
  identifier: string;
  baseURI: string;
  apiVersion: string;
  pluginVersion: string;
}

@Injectable()
export class PluginService1 extends XhrBase<Plugin[]> {
  private url: string = '/plugins';

  constructor(public http: Http) {
    super(http);
  }

  getAll(): Observable<Plugin[]> {
    let result = this.http
      .get(this.url, XhrBase.getHeaders())
      .map((response: Response) => response.json().pluginDefinitions as Plugin[])
      .catch(XhrBase.handleError);

    return result as Observable<Plugin[]>;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

