

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import {Component, ElementRef,  OnInit, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl} from '@angular/forms';

import {SubsystemsService} from './services/subsystems.service';
import {Subsystems, SubsystemItem} from './services/subsystems';
import {SubsystemItemAction} from './subsystem/subsystem-item-action';
import {SubsystemActionsService, SubsystemAction} from "./services/subsystem-actions.service";
import {TranslationService} from 'angular-l10n';

class State {
  static loading = 'loading';
  static error = 'error';
  static subsystems = 'subsystems';
  static subsystem = 'subsystem';
  static action = 'action';
}

const breadcrumbStates = [State.subsystems, State.subsystem, State.action];
const regexType   = /\s*type\s*=\s*(\w+)/i;
const regexFilter = /\s*filter\s*=\s*(\w+)/i;
const regexDrill  = /\s*drill\s*=\s*(\w+)/i;

@Component({
  selector: 'ng2-subsystems-root',
  templateUrl: 'subsystems-root.component.html',
  styleUrls: ['shared.css', 'subsystems-root.component.css']
})
export class SubsystemsRootComponent implements OnInit {
  scope: any; // ng1
  rootBreadCrumb: string;
  state = State.loading;
  errorMessage = '';
  breadcrumbs: string[] = [];

  subsystems: Subsystems;
  subsystemItemAction: SubsystemItemAction;

  superSearchForm: FormGroup;
  superSearchInput: AbstractControl;
  superSearchError = false;
  superSearchTitle = '';

  constructor(
    fb: FormBuilder,
    private translation: TranslationService,
    private subsystemsService: SubsystemsService,
    private subsystemActionsService: SubsystemActionsService,
    private element: ElementRef) {
    // this.scope = angular.element(this.element.nativeElement).scope();
    this.superSearchForm = fb.group({superSearchInput: ''});
    this.superSearchInput = this.superSearchForm.controls['superSearchInput'];
  }

  ngOnInit(): void {
    //this.scope.$emit('app.ready');
    this.subsystemsService.getAll()
      .subscribe(
         (subsystems: Subsystems) => this.ready(subsystems),
         (e: any) => this.error(e)
       );
       this.translation.translationChanged().subscribe(() => {
        this.rootBreadCrumb = this.translation.translate('SubsystemTypes');
       }
    );
  }

  error(e: any) {
    this.errorMessage = e;
    this.state = State.error;
  }

  ready(subsystems: Subsystems) {
    this.subsystems = subsystems;
    this.breadcrumbs.push(this.rootBreadCrumb);
    this.state = State.subsystems;
  }
  /**
   * Use clicks on a breadcrumb.
   * @param index
   */
  setBreadcrumb(index: number): void {
    let itemActon = this.subsystemItemAction;

    this.breadcrumbs.length = index + 1;
    this.state = breadcrumbStates[index];

    switch (index) {
      case 0:
        itemActon.subsystemFilter = '';
        break;
      case 1:
        itemActon.subsystemItems = this.subsystems[itemActon.subsystemName];
        break;
    }
  }

  setSubsystemName(subsystemName: string, filter: string){
     console.log("JOE.setSubsystemName="+subsystemName+" filt="+filter);
     this.state = State.subsystem;
     this.breadcrumbs.push(subsystemName);
     let actionThing:any = this.subsystemActionsService.getActions(subsystemName);
     console.log("JOE.actionThing="+actionThing);
     this.subsystemItemAction = new SubsystemItemAction(
      subsystemName,
      filter,
      this.subsystems[subsystemName],
      actionThing
    );
  }

  /*
    This is dead untested code for some drill/search that we don't understand
  setSubsystemName(subsystemName: string, filter: string) {
    this.state = State.subsystem;
    this.breadcrumbs.push(subsystemName);

    this.subsystemItemAction = new SubsystemItemAction(
      subsystemName,
      filter,
      this.subsystems[subsystemName],
      this.subsystemActionsService.getActions(subsystemName)
    );
  }
  */

  /**
   * Called from template when an action on the subsystem grid is selected
   * @param subsystemItemAction
   */
  setSubsystemItemAction(subsystemItemAction: SubsystemItemAction): void {
    this.subsystemItemAction = subsystemItemAction;
    this.state = State.action;

    let breadcrumb = `${this.subsystemItemAction.getItemName()} (${this.subsystemItemAction.action.display})`;
    this.breadcrumbs.push(breadcrumb);
  }

  superSearch() {
    let value = this.superSearchInput.value.trim().toLocaleLowerCase();

    if (value.length === 0) {
      this.superSearchError = false;
      return;
    }

    this.superSearchError = true;
    this.superSearchTitle = '';

    let matchType  = value.match(regexType);
    let matchFilter  = value.match(regexFilter);
    let matchDrill = value.match(regexDrill);
    let subs = Object.keys(this.subsystems);
    let usage = `Usage: type=${subs} [filter=subsystem-name [drill=drilltype]]`;

    if (matchType) {
      let subsystemName = matchType[1].toLocaleLowerCase();
      let match = subs.some((sub: string) => {
        let result = sub.toLocaleLowerCase() === subsystemName;

        if (result) {
          subsystemName = sub;
        }

        return result;
      });

      if (match) {
        let filter = '';

        if (matchFilter) {
          filter = matchFilter[1];

          if (matchDrill) {
            let drill = matchDrill[1].toLocaleLowerCase();
            let actions: SubsystemAction[] = this.subsystemActionsService.getActions(subsystemName);
            let drills: string[] = actions.map((action: SubsystemAction) => action.drill);
            let index = drills.indexOf(drill);

            if (index >= 0) {
              let item: SubsystemItem = {name: filter.toUpperCase(), t: '', subsystemType: 'FOO'};

              this.superSearchError = false;
              this.breadcrumbs.length = 1;
              this.breadcrumbs.push(subsystemName);

              let itemAction = new SubsystemItemAction(
                subsystemName,
                '',
                [item],
                actions[index]
              );

              this.setSubsystemItemAction(itemAction);
            } else {
              this.superSearchTitle = `Bad drill=${drill}, allowed=${drills}. ${usage}`;
            }
          }
        }

        if (!matchDrill) {
          this.superSearchError = false;
          this.breadcrumbs.length = 1;
          // not setting subsystem because drill option not understand
          //this.setSubsystemName(subsystemName, filter);
        }
      } else {
        this.superSearchTitle = `Bad type=${subsystemName}. ${usage}`;
      }
    } else {
      this.superSearchTitle = usage;
    }
  }
}





/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

