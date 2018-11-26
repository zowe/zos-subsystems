

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

import {NgModule, Inject} from '@angular/core';
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
import { TranslationModule, ISOCode, L10nLoader, LOCALE_CONFIG, TRANSLATION_CONFIG, LocaleConfig, TranslationConfig } from 'angular-l10n';
import { Angular2L10nConfig, Angular2InjectionTokens } from 'pluginlib/inject-resources';

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
    TranslationModule.forRoot({
      translation: {
        providers: [],
        composedLanguage: [ISOCode.Language, ISOCode.Country]
      }}
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SubsystemsRootComponent
  ]
})
export class SubsystemsRootModule {
  constructor(
    private l10nLoader: L10nLoader,
    @Inject(Angular2InjectionTokens.L10N_CONFIG) private l10nConfig: Angular2L10nConfig,
    @Inject(LOCALE_CONFIG) private localeConfig: LocaleConfig,
    @Inject(TRANSLATION_CONFIG) private translationConfig: TranslationConfig,

  ) {
    this.localeConfig.defaultLocale = this.l10nConfig.defaultLocale;
    this.translationConfig.providers = this.l10nConfig.providers;
    this.l10nLoader.load();
  }
}




/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

