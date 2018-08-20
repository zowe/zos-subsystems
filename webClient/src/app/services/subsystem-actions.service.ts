

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Injectable} from '@angular/core';

export interface SubsystemAction {
  display: string;
  drill: string;
  uri: string;
  link?: string;
}

@Injectable()
export class SubsystemActionsService {
  private map = new Map<string, SubsystemAction[]> ([
    ['cics', [
      {display: 'Files',          drill: 'file',   uri: 'cics/files', link: 'Edit'},
      {display: 'Programs',       drill: 'prog',   uri: 'cics/programs'},
      {display: 'Transactions',   drill: 'trans',  uri: 'cics/transactions'}
    ]],
    ['ims', [
      {display: 'Databases',      drill: 'db',     uri: 'ims/database'},
      {display: 'Programs',       drill: 'prog',   uri: 'ims/program'}
    ]],
    ['db2', [
      {display: 'Configuration',  drill: 'config',  uri: 'db2/configuration'}
//      {display: 'Buffer Pools',   drill: 'buf',    uri: 'db2/bufferPool'},
//      {display: 'Threads',        drill: 'thread', uri: 'db2/thread'}
    ]],
    ['mq', [
      {display: 'Databases',      drill: 'db',     uri: 'mq/database'},
      {display: 'Programs',       drill: 'prog',   uri: 'mq/program'},
      {display: 'Routing Codes',  drill: 'route',  uri: 'mq/routingCode'},
      {display: 'Transactions',   drill: 'trans',  uri: 'mq/transaction'}
    ]],
  ]);

  getActions(subsystemName: string): SubsystemAction[] {
    let result = this.map.get(subsystemName.toLocaleLowerCase());

    return result;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

