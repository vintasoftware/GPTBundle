'use server';

import dedent from 'dedent';
import { openai } from './common';

export interface GeneratorArgsType {
  prompt: string,
  content: string,
}

export interface GeneratorSettingsType {
  model?: string,
  getPromptMessage?: ((args: GeneratorArgsType) => string),
  getResponseFormatMessage?: ((args: GeneratorArgsType) => string),
  getSystemMessage?: ((args: GeneratorArgsType) => string),
};

const JSON_SCHEMA_EXAMPLE = {
  title: 'Replace with useful name',
  description: 'Replace with useful description',
  type: 'object',
  properties: {
    field1_replace_with_readable_name: {
      type: 'integer',
      title: 'Replace with human-readable description for this field',
      enum: [1, 2, 3, 4, 5],
    },
    field2_replace_with_readable_name: {
      type: 'string',
      title: 'Replace with human-readable description for this field',
      enum: ['foo', 'bar', 'fuzz', 'qux'],
    },
    field3_replace_with_readable_name: {
      type: 'string',
      title: 'Replace with human-readable description for this field',
    },
    field4_replace_with_readable_name: {
      type: 'number',
      title: 'Replace with human-readable description for this field',
      min: 0.0,
      max: 100.0,
    },
    field5_replace_with_readable_name: {
      type: 'string',
      title: 'Replace with human-readable description for this field',
    },
    field6_replace_with_readable_name: {
      type: 'string',
      title: 'Replace with human-readable description for this field',
      format: 'date',
    },
    field7_replace_with_readable_name: {
      type: 'string',
      title: 'Replace with human-readable description for this field',
      format: 'email',
    },
    field8_replace_with_readable_name: {
      type: 'boolean',
      title: 'Replace with human-readable description for this field',
    },
  },
};

const UI_SCHEMA_EXAMPLE = {
  field1_replace_with_readable_name: { 'ui:widget': 'radio' },
  field2_replace_with_readable_name: { 'ui:widget': 'radio' },
  field3_replace_with_readable_name: { 'ui:widget': 'textarea' },
  field4_replace_with_readable_name: { 'ui:widget': 'range' },
  field5_replace_with_readable_name: { 'ui:widget': 'text' },
  field6_replace_with_readable_name: { 'ui:widget': 'date' },
  field7_replace_with_readable_name: { 'ui:widget': 'email' },
  field8_replace_with_readable_name: { 'ui:widget': 'select' },
};

function getSystemMessage() {
  const today = new Date().toISOString().substring(0, 10);
  return dedent`
    You are a helpful assistant designed to output JSON.
    Today is ${today}.
    You will receive a text content and you must output
    a valid JSON Schema and a valid UISchema based on that content.
    The JSON Schema and a UISchema will be feed
    into library react-jsonschema-form to generate
    a form related to the provided content.`;
}

function getResponseFormatMessage() {
  return dedent`
    The JSON Schema output for form generation must be like this (but adapt it to the content):
    \`\`\`${JSON.stringify(JSON_SCHEMA_EXAMPLE)}\`\`\`
    While the UISchema output for form rendering output must be like this (but adapt it to the content):
    \`\`\`${JSON.stringify(UI_SCHEMA_EXAMPLE)}\`\`\`
    Use only the ui:widget values from the UISchema example above.
    Output both JSON Schema and UISchema as JSON objects like this:
    \`\`\`{"json_schema": ..., "ui_schema": ...}\`\`\``
}

function getPromptMessage({ content, prompt }: GeneratorArgsType) {
  return dedent`
    I need help to generate a JSON Schema and a UISchema for a web form.
    I already have the content:
    [CONTENT START]
    ${content}
    [CONTENT FINISHED]
    Please generate a JSON Schema and a UISchema for this content considering those instructions:
    ${prompt}`;
}

export async function customGenerateGPTFormSchema(args: GeneratorArgsType, settings: GeneratorSettingsType) {
  try {
    const model = settings.model ?? 'gpt-4-1106-preview';
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
        { role: 'system', content: getSystemMessageFn(args) },
        { role: 'system', content: getResponseFormatMessageFn(args) },
        { role: 'user', content: getPromptMessageFn(args) },
      ],
    });
    if (!completion.choices[0].message.content) {
      throw new Error('OpenAI returned an empty response. Please try again.');
    }
    const { json_schema, ui_schema } = JSON.parse(completion.choices[0].message.content);
    if (!json_schema) {
      throw new Error('OpenAI returned an empty JSON Schema. Please try again.');
    }
    if (!ui_schema) {
      throw new Error('OpenAI returned an empty UI Schema. Please try again.');
    }
    return { json_schema, ui_schema };
  } catch (e) {
    throw new Error('Failed to communicate with OpenAI. Please try again.');
  }
}

export async function generateGPTFormSchema(args: GeneratorArgsType) {
  return customGenerateGPTFormSchema(args, {});
}
