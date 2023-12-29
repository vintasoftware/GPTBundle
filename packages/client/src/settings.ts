export interface AssistantArgsType {
  pageTitle: string,
  formTitle: string,
  fieldsToFill: Array<string>,
  fields: Record<string, string>,
  fieldLabels: Record<string, string[]>,
  fieldChoices: Record<string, string[]>
}

export interface SettingsType {
  generateFormAutofillFn: ((args: AssistantArgsType) => Promise<Record<string, string>[]>) | null;
  generateFormSchemaFn: ((...args: any[]) => Promise<{json_schema: any, ui_schema: any}>) | null;
}

export const settings: SettingsType = {
  generateFormAutofillFn: null,
  generateFormSchemaFn: null,
};
