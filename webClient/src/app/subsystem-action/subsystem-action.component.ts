

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {Component, OnChanges, SimpleChanges, Input} from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl} from '@angular/forms';

import {SubsystemItemAction} from '../subsystem/subsystem-item-action';
import {DiscoveryTableService, GetOptions} from '../services/discovery-table.service';
import {DiscoveryTable, ColumnMetaData} from '../meta-data/discovery-table';

class State {
  static loading = 'loading';
  static error = 'error';
  static ready = 'ready';
}

@Component({
  selector: 'ng2-subsystem-action',
  templateUrl: 'subsystem-action.component.html',
  styleUrls:  ['../shared.css', 'subsystem-action.component.css']
})
export class SubsystemActionComponent implements OnChanges {
  @Input() subsystemItemAction: SubsystemItemAction;
  @Input() scope: any; // ng1

  discoveryTable: DiscoveryTable;
  state = State.loading;
  errorMessage = '';
  cols: ColumnMetaData[];
  rows: any[];
  searchRows: any[];

  searchForm: FormGroup;
  searchInput: AbstractControl;

  constructor(fb: FormBuilder, private discoveryTableService: DiscoveryTableService) {
    this.searchForm = fb.group({searchInput: ''});
    this.searchInput = this.searchForm.controls['searchInput'];
    this.searchInput.valueChanges.subscribe((value: string) => this.search(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    let getOptions: GetOptions = {uri: this.subsystemItemAction.action.uri};

    this.discoveryTableService.getAll(getOptions)
      .subscribe(
        (discoveryTable: DiscoveryTable) => this.ready(discoveryTable),
        (e: any) => {
          this.errorMessage = e;
          this.state = State.error;
        }
      );
  }

  ready(discoveryTable: DiscoveryTable): void {
    this.discoveryTable = discoveryTable;
    this.cols = this.discoveryTable.metaData.columnMetaData;

    // TODO HACK
    console.log('TODO: subststem-action.component.ts#nOinit filtering');
    if (this.discoveryTable.rows.length > 0) {
      let name = this.cols[0].columnIdentifier;
      let subsystemName = this.subsystemItemAction.getItemName();

      this.rows = this.discoveryTable.rows.filter((row: any) => row[name] === subsystemName);
      this.cols.shift(); // removes the 1st column in the table results
    } else {
      this.rows = this.discoveryTable.rows;
    }

    this.searchRows = this.rows;
    this.state = State.ready;
  }

  search(value: string): void {
    value = value.trim().toLocaleLowerCase();

    if (value.length == 0) {
      this.searchRows = this.rows;
    } else {
      this.searchRows = this.rows
        .filter((row: any) =>
          this.cols
            .some((col : ColumnMetaData) =>
              row[col.columnIdentifier].toString().toLocaleLowerCase().indexOf(value) > -1)
      );
    }
  }

  setAction(row: any) {
    let dataset = row['dsn'].toString().trim();

    console.log('dataset', dataset);

    this.scope.$emit('virtualDesktop.runApp','com.rs.dataeditor', {
      vsamDataset: dataset
    });
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

