

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';

export abstract class XhrBase<T> {
  constructor(public http: Http) {
  }

  abstract getAll(anyVal?: any): Observable<T>;

  static getHeaders(): RequestOptionsArgs {
    let headers = new Headers();
    let result: RequestOptionsArgs = {headers: headers};

    headers.append('Accept', 'application/json');

    return result;
  }
  
  static handleError(error: any): Observable<void> {
    let errorMsg = error.message || 'There was was a problem with our hyperdrive device and we couldn\'t retrieve your data!';

    return Observable.throw(errorMsg);
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

