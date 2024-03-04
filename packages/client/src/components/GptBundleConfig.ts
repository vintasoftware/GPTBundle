'use client';

import { SettingsType, settings } from '../settings';

export function GptBundleConfig(apiSettings: SettingsType) {
  settings.generateFormAutofillFn = apiSettings.generateFormAutofillFn;
  settings.generateFormSchemaFn = apiSettings.generateFormSchemaFn;
  return null;
}
