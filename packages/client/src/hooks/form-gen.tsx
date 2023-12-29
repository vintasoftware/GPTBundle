'use client';

import { useCallback, useState } from 'react';
import { RJSFSchema, UiSchema } from '@rjsf/utils';

import { settings } from '../settings';

export function useGeneratedFormSchema() {
  const [formSchema, setFormSchema] = useState<RJSFSchema | null>(null);
  const [uiSchema, setUiSchema] = useState<UiSchema<any, RJSFSchema> | undefined>(undefined);

  const generateFormSchema = useCallback(async (content: string, prompt: string) => {
    if (!settings.generateFormSchemaFn) {
      throw new Error('Cannot use form generator without generateFormSchemaFn');
    }

    setFormSchema(null);
    setUiSchema(undefined);

    if (!content || !prompt) return;

    const schemaResponse = await settings.generateFormSchemaFn({ content, prompt });
    setFormSchema(schemaResponse.json_schema);
    setUiSchema(schemaResponse.ui_schema);
  }, []);

  return { formSchema, uiSchema, generateFormSchema };
}
