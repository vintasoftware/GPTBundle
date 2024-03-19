import { openai } from '../src/actions/common';
import {
  AssistantArgsType,
  customGenerateGPTFormAutofill,
  generateGPTFormAutofill,
} from '../src/actions/form-assistant';
import { mockOpenAIResponse } from './utils';

jest.mock('../src/actions/common', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

const baseAssistantArgs: AssistantArgsType = {
  pageTitle: 'Test Page Title',
  formTitle: 'Create Issue',
  fieldsToFill: ['category', 'priority'],
  fields: {
    title: 'Fix N+1s in Django codebase',
    description: 'Use prefetch...',
    category: '',
    priority: '',
  },
  fieldLabels: {
    title: ['Issue title'],
    description: ['Issue description'],
    category: ['Issue category (Bug, Feature, Improvement)'],
    priority: ['Issue priority (High, Medium, Low)'],
  },
  fieldChoices: {
    category: ['Bug', 'Feature', 'Improvement'],
    priority: ['High', 'Medium', 'Low'],
  },
};

const baseOpenAIResponse = {
  fields: [
    {
      name: 'category',
      value: 'Improvement',
    },
    {
      name: 'priority',
      value: 'Medium',
    },
  ],
};

describe('Form Assistant', () => {
  it('should pass all args to the prompt message', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    await generateGPTFormAutofill(baseAssistantArgs);

    const { calls } = (openai.chat.completions.create as jest.Mock).mock;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual([
      expect.objectContaining({
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: 'system',
          }),
          expect.objectContaining({
            role: 'system',
          }),
          expect.objectContaining({
            role: 'user',
            content:
              expect.stringContaining(baseAssistantArgs.pageTitle) &&
              expect.stringContaining(baseAssistantArgs.formTitle) &&
              expect.stringContaining(JSON.stringify(baseAssistantArgs.fieldsToFill)) &&
              expect.stringContaining(JSON.stringify(baseAssistantArgs.fields)) &&
              expect.stringContaining(JSON.stringify(baseAssistantArgs.fieldLabels)) &&
              expect.stringContaining(
                JSON.stringify(
                  baseAssistantArgs.fieldsToFill
                    .map((field) => ({
                      field,
                      options: baseAssistantArgs.fieldChoices[field],
                    }))
                    .filter(({ options }) => options),
                ),
              ),
          }),
        ]),
      }),
    ]);
  });

  it('should handle optional args and pass default values to the prompt message', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    await customGenerateGPTFormAutofill(
      {
        ...baseAssistantArgs,
        pageTitle: undefined,
        formTitle: undefined,
        fieldLabels: undefined,
        fieldChoices: undefined,
      },
      {},
    );

    const { calls } = (openai.chat.completions.create as jest.Mock).mock;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual([
      expect.objectContaining({
        model: 'gpt-3.5-turbo-1106',
        response_format: { type: 'json_object' },
        messages: expect.arrayContaining([
          expect.objectContaining({
            role: 'system',
          }),
          expect.objectContaining({
            role: 'system',
          }),
          expect.objectContaining({
            role: 'user',
            content:
              expect.not.stringContaining(baseAssistantArgs.pageTitle) &&
              expect.not.stringContaining(baseAssistantArgs.formTitle) &&
              expect.stringContaining(JSON.stringify(baseAssistantArgs.fieldsToFill)) &&
              expect.stringContaining(JSON.stringify(baseAssistantArgs.fields)) &&
              expect.not.stringContaining(JSON.stringify(baseAssistantArgs.fieldLabels)) &&
              expect.not.stringContaining(
                JSON.stringify(
                  baseAssistantArgs.fieldsToFill
                    .map((field) => ({
                      field,
                      options: baseAssistantArgs.fieldChoices[field],
                    }))
                    .filter(({ options }) => options),
                ),
              ),
          }),
        ]),
      }),
    ]);
  });

  it('should use custom messages from the settings paramenter', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    const model = 'test-model';
    const getSystemMessage = () => 'Test system message';
    const getResponseFormatMessage = () => 'Test response format message';
    const getPromptMessage = () => 'Test prompt message';

    await customGenerateGPTFormAutofill(baseAssistantArgs, {
      model,
      getSystemMessage,
      getResponseFormatMessage,
      getPromptMessage,
    });

    const { calls } = (openai.chat.completions.create as jest.Mock).mock;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual([
      {
        model,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: getSystemMessage(),
          },
          {
            role: 'system',
            content: getResponseFormatMessage(),
          },
          {
            role: 'user',
            content: getPromptMessage(),
          },
        ],
      },
    ]);
  });

  it('should throw an error when OpenAI returns an empty response', async () => {
    mockOpenAIResponse(null);

    await expect(customGenerateGPTFormAutofill(baseAssistantArgs, {})).rejects.toThrow(
      'OpenAI returned an empty response. Please try again.',
    );
    await expect(generateGPTFormAutofill(baseAssistantArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
  });

  it('should throw an error when OpenAI returns an empty Autofill Fields', async () => {
    const testEmptyAutofillFields = async (value: any) => {
      mockOpenAIResponse(
        JSON.stringify({
          fields: value,
        }),
      );

      await expect(customGenerateGPTFormAutofill(baseAssistantArgs, {})).rejects.toThrow(
        'OpenAI returned an empty Autofill Fields. Please try again.',
      );
      await expect(generateGPTFormAutofill(baseAssistantArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
    };

    await testEmptyAutofillFields(null);
    await testEmptyAutofillFields(undefined);
    await testEmptyAutofillFields([]);
  });

  it('should throw an error when failed to communicate with OpenAI', async () => {
    (openai.chat.completions.create as jest.Mock).mockRejectedValue(
      new Error('OpenAI API request exceeded rate limit'),
    );

    await expect(customGenerateGPTFormAutofill(baseAssistantArgs, {})).rejects.toThrow(
      'OpenAI API request exceeded rate limit',
    );
    await expect(generateGPTFormAutofill(baseAssistantArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
  });

  it('should return a valid Autofill Fields (multi field)', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    const response = await generateGPTFormAutofill(baseAssistantArgs);

    expect(response).toEqual(baseOpenAIResponse.fields);
  });

  it('should return a valid Autofill Fields (single field)', async () => {
    const assistantArgs = {
      ...baseAssistantArgs,
      fieldsToFill: ['category'],
    };
    const openAIResponse = {
      fields: [
        {
          name: 'category',
          value: 'Feature',
        },
      ],
    };

    mockOpenAIResponse(JSON.stringify(openAIResponse));

    const response = await generateGPTFormAutofill(assistantArgs);

    expect(response).toEqual(openAIResponse.fields);
  });
});
