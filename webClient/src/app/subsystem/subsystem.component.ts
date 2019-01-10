

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, Inject} from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl} from '@angular/forms';

import {SubsystemItem} from '../services/subsystems';
import {SubsystemItemAction} from './subsystem-item-action';
import {SubsystemActionsService, SubsystemAction} from '../services/subsystem-actions.service';
import {DiscoveryTableService, GetOptions} from "../services/discovery-table.service";
import {DiscoveryTable} from "../meta-data/discovery-table";
import { Angular2InjectionTokens } from 'pluginlib/inject-resources';

@Component({
  selector: 'ng2-subsystem',
  templateUrl: 'subsystem.component.html',
  styleUrls: ['../shared.css', 'subsystem.component.css']
})
export class SubsystemComponent implements OnChanges {
  @Input() subsystemInput: SubsystemItemAction;
  @Output() subsystemOutput = new EventEmitter<SubsystemItemAction>();

  actions: SubsystemAction[];
  searchRows: SubsystemItem[];
  action: string;
  counts: number[][];
  ready: boolean;

  searchForm: FormGroup;
  searchInput: AbstractControl;

  constructor(
    fb: FormBuilder,
    private subsystemActionsService: SubsystemActionsService,
    private discoveryTableService: DiscoveryTableService,
    @Inject(Angular2InjectionTokens.LOGGER) private log: ZLUX.ComponentLogger) {
    this.searchForm = fb.group({searchInput: ''});
    this.searchInput = this.searchForm.controls['searchInput'];
    this.searchInput.valueChanges.subscribe((value: string) => this.search(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    let input = this.subsystemInput;

    this.searchRows = input.subsystemItems;
    this.actions = this.subsystemActionsService.getActions(input.subsystemName) || [];
    this.hackCounts();

    if (input.subsystemFilter.trim().length > 0) {
      this.searchInput.setValue(input.subsystemFilter);
      this.search(input.subsystemFilter);
    }
  }

  hackCounts() {
    // TODO HACK
    this.log.warn('TODO: subsystem.component.ts counts');

    this.counts = new Array<Array<number>>(this.subsystemInput.subsystemItems.length);

    for (let iRow = 0; iRow < this.counts.length; ++iRow) {
      let row: number[] = this.counts[iRow] = new Array<number>(this.actions.length);
      row.fill(-1);
    }

    this.actions.forEach((action: SubsystemAction, actionIndex: number) => {
      let getOptions: GetOptions = {uri: action.uri};

      this.discoveryTableService.getAll(getOptions)
        .subscribe(
          (discoveryTable: DiscoveryTable) => this.hackTableCounts(discoveryTable, actionIndex),
          (e: any) => this.log.warn('error', e)
        );
    });
  }

  hackTableCounts(discoveryTable: DiscoveryTable, actionIndex: number) {
    let rows = discoveryTable.rows;
    this.log.debug("discoveryTable.metaData=",discoveryTable.metaData);
    let name = discoveryTable.metaData.columnMetaData[0].columnIdentifier;
    let counts = this.counts;

    this.subsystemInput.subsystemItems.forEach((item: SubsystemItem, rowIndex: number) => {
      counts[rowIndex][actionIndex] = rows
        .map((row: any) => row[name])
        .reduce((sum: number, value: string) => value === item.name ? sum + 1 : sum, 0);
    });
  }

  setAction(item: SubsystemItem, action: SubsystemAction) {
    this.subsystemOutput.next(
      new SubsystemItemAction(this.subsystemInput.subsystemName, this.subsystemInput.subsystemFilter, [item], action));
  }

  search(value: string): void {
    this.subsystemInput.subsystemFilter = value = value.trim().toLocaleLowerCase();

    if (value.length == 0) {
      this.searchRows = this.subsystemInput.subsystemItems;
    } else {
      this.searchRows = this.subsystemInput.subsystemItems
        .filter((item: SubsystemItem) => item.name.toLocaleLowerCase().indexOf(value) > -1);
    }
  }

  /**
   * TODO HACK
   * @param rowIndex
   * @param actionIndex
   * @returns {number}
   */
  getCount(rowIndex: number, actionIndex: number): string {
    let count = this.counts[rowIndex][actionIndex];
    let result = count < 0 ? '-' : count.toString();

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

