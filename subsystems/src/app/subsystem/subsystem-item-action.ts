

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {SubsystemItem} from '../services/subsystems';
import {SubsystemAction} from '../services/subsystem-actions.service';

export class SubsystemItemAction {
  constructor(
    public subsystemName: string,
    public subsystemFilter: string,
    public subsystemItems: SubsystemItem[],
    public action: SubsystemAction) {
  }

  getItemName(): string {
    return this.subsystemItems.length > 0 && this.subsystemItems[0].name ? this.subsystemItems[0].name : '?';
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

