/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import {Component, Input} from '@angular/core';
import { SubsystemAction } from '../services/subsystem-actions.service';

@Component({
  selector: 'subsystem-action-text',
  templateUrl: 'subsystem-action-text.component.html'
})
export class SubsystemActionTextComponent {
  @Input() subsystemAction: SubsystemAction;
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

