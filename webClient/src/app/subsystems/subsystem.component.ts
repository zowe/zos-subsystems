

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {
  Component,
  OnChanges,
  SimpleChanges,
  OnInit,
  Input,
  Output,
  EventEmitter} from '@angular/core';
import {SubsystemItem} from "../services/subsystems";
import {SubsystemItemAction} from "./subsystem-item-action";

const actionMap =  new Map<string, string[]> ([
  ['IMS', ['Databases', 'Programs', 'Routing Codes', 'Transactions']],
  ['DB2', ['Address Spaces', 'Buffer Pools', 'Threads']],
  ['CICS', ['Databases', 'Programs', 'Routing Codes', 'Transactions']],
  ['MQ', ['Databases', 'Programs', 'Routing Codes', 'Transactions']]
]);

@Component({
  selector: 'ng2-subsystem',
  templateUrl: 'subsystem.component.html',
  styleUrls: ['subsystems.component.css']
})
export class SubsystemComponent implements OnInit, OnChanges {
  @Input() subsystemItems: SubsystemItem[];
  @Input() subsystemName: string;
  @Output() subsystemItemAction = new EventEmitter<SubsystemItemAction>();
  actions: string[];
  subsystemItem: SubsystemItem;
  action: string;

  constructor() {
  }

  ngOnInit() {
    this.actions = actionMap.get(this.subsystemName) || [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  setAction(item: SubsystemItem, action: string): boolean {
    this.subsystemItemAction.next(new SubsystemItemAction(item, action));

    return false;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

