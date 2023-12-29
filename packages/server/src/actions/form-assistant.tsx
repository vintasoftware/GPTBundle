'use server';

import dedent from 'dedent';
import { openai } from './common';

export interface AssistantSettingsType {
  model?: string,
  getPromptMessage?: ((args: AssistantArgsType) => string),
  getResponseFormatMessage?: ((args: AssistantArgsType) => string),
  getSystemMessage?: ((args: AssistantArgsType) => string),
};

export interface AssistantArgsType {
  pageTitle: string,
  formTitle: string,
  fieldsToFill: string[],
  fields: Record<string, string>,
  fieldLabels: Record<string, string[]>,
  fieldChoices: Record<string, string[]>,
}

function getPromptMessage({
  pageTitle,
  formTitle,
  fieldsToFill,
  fields,
  fieldLabels,
  fieldChoices,
} : AssistantArgsType) {
  const fieldNames = Object.keys(fields);
  const hasLabels = Object.keys(fieldLabels).length > 0;
  const fieldsToFillOptions = fieldsToFill
    .map((field) => ({
      field,
      options: fieldChoices[field],
    }))
    .filter(({ options }) => options);

  return dedent`
    I need help to fill a web page form.
    This form has the fields: ${JSON.stringify(fieldNames)}.
    ${pageTitle ? `I'm on a web page with the title "${pageTitle}".` : ''}
    ${formTitle ? `The form is titled "${formTitle}".` : ''}
    ${hasLabels ? `The fields have the following labels: ${JSON.stringify(fieldLabels)}.` : ''}
    I already filled the form with the following values: ${JSON.stringify(fields)}.
    Please fill these fields for me: ${JSON.stringify(fieldsToFill)}
    ${
      fieldsToFillOptions.length
        ? `Note: the following fields have restricted options, respect those: ${JSON.stringify(fieldsToFillOptions)}`
        : ''
    }`;
}

function getSystemMessage() {
  const today = new Date().toISOString().substring(0, 10);
  return dedent`
    You are a helpful assistant designed to output JSON to help users fill web forms.
    You will be given a description of a web page form with fields and values.
    You will be asked to fill the form fields with useful information, not placeholders.
    Description fields must be filled with detailed how and why.
    Today is ${today}.`
}

function getResponseFormatMessage() {
  return 'The JSON response format must be like this: {"fields": [{"name": "foo", "value": "bar"}]}';
}

export async function customGenerateGPTFormAutofill(args : {
  pageTitle?: string,
  formTitle?: string,
  fieldsToFill: Array<string>,
  fields: Record<string, string>,
  fieldLabels?: Record<string, string[]>,
  fieldChoices?: Record<string, string[]>,
}, settings: AssistantSettingsType): Promise<Record<string, string>[]> {
  const argsWithDefaults : AssistantArgsType = {
    ...args,
    pageTitle: args.pageTitle ?? '',
    formTitle: args.formTitle ?? '',
    fieldLabels: args.fieldLabels ?? {},
    fieldChoices: args.fieldChoices ?? {},
  };
  const model = settings.model ?? 'gpt-3.5-turbo-1106';
  const getSystemMessageFn = settings.getSystemMessage ?? getSystemMessage;
  const getResponseFormatMessageFn = settings.getResponseFormatMessage ?? getResponseFormatMessage;
  const getPromptMessageFn = settings.getPromptMessage ?? getPromptMessage;

  // console.log(model);
  // console.log(getSystemMessageFn(args));
  // console.log(getResponseFormatMessageFn(args));
  // console.log(getPromptMessageFn(args));

  const completion = await openai.chat.completions.create({
    model: model,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: getSystemMessageFn(argsWithDefaults),
      },
      {
        role: 'system',
        content: getResponseFormatMessageFn(argsWithDefaults),
      },
      {
        role: 'user',
        content: getPromptMessageFn(argsWithDefaults),
      },
    ],
  });
  if (!completion.choices[0].message.content) {
    throw new Error('OpenAI returned an empty response. Please try again.');
  }
  const { fields: autofillFields } = JSON.parse(completion.choices[0].message.content);
  if (!autofillFields) {
    throw new Error('OpenAI returned an empty response. Please try again.');
  }
  return autofillFields;
}

export async function generateGPTFormAutofill(args: AssistantArgsType) {
  return customGenerateGPTFormAutofill(args, {});
}
