"use client";

import { SettingsType, settings } from '../settings';

export function AIFormToolkitConfig(apiSettings : SettingsType) {
  settings.generateFormAutofillFn = apiSettings.generateFormAutofillFn;
  settings.generateFormSchemaFn = apiSettings.generateFormSchemaFn;
  return null;
}
