

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
import {L10nConfigService} from './services/l10n-config.service';
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
    L10nConfigService,
    PluginService1,
    DiscoveryTableService,
    SubsystemsService,
    SubsystemActionsService
  ],
  imports: [
    CommonModule,
    HttpModule,
    //TranslationModule.forChild({
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
    @Inject(LOCALE_CONFIG) private localeConfig: LocaleConfig,
    @Inject(TRANSLATION_CONFIG) private translationConfig: TranslationConfig,
    private l10nConfigService: L10nConfigService,
  ) {
    this.localeConfig.defaultLocale = this.l10nConfigService.getDefaultLocale();
    this.translationConfig.providers = this.l10nConfigService.getTranslationProviders();
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

