

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

export interface ColumnMetaData {
  columnIdentifier: string;
  longColumnLabel: string;
  shortColumnLabel: string;
  displayHints: DisplayHintsMetaData;
}

export interface DisplayHintsMetaData {
  minWidth: number;
  maxWidth: number;
}

export interface TableMetaData {
  shortTableLabel: string;
  tableIdentifier: string;
}

export interface DiscoveryMetaData {
  columnMetaData: ColumnMetaData[];
  tableMetaData: TableMetaData;
}

export interface DiscoveryTable {
  metaData: DiscoveryMetaData;
  resultMetaDataSchemaVersion: string;
  resultType: string;
  rows: any[];
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

