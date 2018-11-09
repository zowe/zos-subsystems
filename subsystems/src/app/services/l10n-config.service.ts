/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  SPDX-License-Identifier: EPL-2.0
  Copyright Contributors to the Zowe Project.
*/

import { Inject, Injectable } from '@angular/core';
import { Angular2InjectionTokens } from 'pluginlib/inject-resources';
import {
  ISOCode,
  ProviderType
} from 'angular-l10n';
import { DefaultLocaleCodes } from 'angular-l10n/src/models/types';

@Injectable()
export class L10nConfigService {
  constructor(
    @Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition,
  ) {
  }

  getDefaultLocale(): DefaultLocaleCodes {
    const langCountry = ZoweZLUX.globalization.getLanguage();
    const baseLanguage = langCountry.split('-')[0];
    return {
      languageCode: baseLanguage,
      countryCode: ZoweZLUX.globalization.getLocale()
    };
  }

  getTranslationProviders(): any[] {
    const basePlugin = this.pluginDefinition.getBasePlugin();
    const prefix = ZoweZLUX.uriBroker.pluginResourceUri(basePlugin, `assets/i18n/messages.`);
    return [
      // messages.en.json - a fallback file in case there is no translation file for a given language found
      { type: ProviderType.Fallback, prefix: `${prefix}en`, fallbackLanguage: [] },
      // e.g. messages.es.json
      { type: ProviderType.Fallback, prefix: prefix, fallbackLanguage: [ISOCode.Language] },
      // e.g. messages.es-ES.json
      { type: ProviderType.Static, prefix: prefix }
    ];
  }

 }

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  SPDX-License-Identifier: EPL-2.0
  Copyright Contributors to the Zowe Project.
*/
