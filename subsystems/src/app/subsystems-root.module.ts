

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Services
import {PluginService1} from './services/plugin.service';
import {SubsystemsService} from './services/subsystems.service';
import {DiscoveryTableService} from './services/discovery-table.service';
// Components
import {SubsystemsRootComponent} from './subsystems-root.component';
import {SubsystemsComponent} from './subsystems/subsystems.component';
import {SubsystemComponent} from './subsystem/subsystem.component';
import {SubsystemActionComponent} from './subsystem-action/subsystem-action.component';
import {SubsystemActionsService} from './services/subsystem-actions.service';
import {SubsystemActionTextComponent} from './subsystem-action-text/subsystem-action-text.component';

@NgModule({
  declarations: [
    SubsystemsRootComponent,
    SubsystemsComponent,
    SubsystemComponent,
    SubsystemActionComponent,
    SubsystemActionTextComponent
  ],
  exports: [
    SubsystemsRootComponent,
    SubsystemsComponent,
    SubsystemComponent,
    SubsystemActionComponent
  ],
  providers: [
    PluginService1,
    DiscoveryTableService,
    SubsystemsService,
    SubsystemActionsService
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SubsystemsRootComponent
  ]
})
export class SubsystemsRootModule {}




/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

