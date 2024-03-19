import { openai } from '../src/actions/common';
import { GeneratorArgsType, customGenerateGPTFormSchema, generateGPTFormSchema } from '../src/actions/form-gen';
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

const baseGeneratorArgs: GeneratorArgsType = {
  content: 'Test content',
  prompt: 'Test prompt',
};

const baseOpenAIResponse = {
  json_schema: {
    type: 'object',
    title: 'Test Form',
    properties: {
      email: {
        type: 'string',
        title: 'Email address',
        format: 'email',
      },
      name: {
        type: 'string',
        title: 'Full name',
      },
    },
  },
  ui_schema: {
    email: {
      'ui:widget': 'email',
    },
    name: {
      'ui:widget': 'text',
    },
  },
};

describe('Form Generation', () => {
  it('should pass all args to the prompt message', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    await generateGPTFormSchema(baseGeneratorArgs);

    const { calls } = (openai.chat.completions.create as jest.Mock).mock;

    expect(calls.length).toEqual(1);
    expect(calls[0]).toEqual([
      expect.objectContaining({
        model: 'gpt-4-1106-preview',
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
              expect.stringContaining(baseGeneratorArgs.content) && expect.stringContaining(baseGeneratorArgs.prompt),
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

    await customGenerateGPTFormSchema(baseGeneratorArgs, {
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

    await expect(customGenerateGPTFormSchema(baseGeneratorArgs, {})).rejects.toThrow(
      'OpenAI returned an empty response. Please try again.',
    );
    await expect(generateGPTFormSchema(baseGeneratorArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
  });

  it('should throw an error when OpenAI returns an empty JSON Schema', async () => {
    const testEmptyJSONSchema = async (schema: any) => {
      mockOpenAIResponse(
        JSON.stringify({
          ...baseOpenAIResponse,
          json_schema: schema,
        }),
      );

      await expect(customGenerateGPTFormSchema(baseGeneratorArgs, {})).rejects.toThrow(
        'OpenAI returned an empty JSON Schema. Please try again.',
      );
      await expect(generateGPTFormSchema(baseGeneratorArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
    };

    await testEmptyJSONSchema(null);
    await testEmptyJSONSchema(undefined);
    await testEmptyJSONSchema('');
    await testEmptyJSONSchema({});
  });

  it('should throw an error when OpenAI returns an empty UI Schema', async () => {
    const testEmptyUISchema = async (schema: any) => {
      mockOpenAIResponse(
        JSON.stringify({
          ...baseOpenAIResponse,
          ui_schema: schema,
        }),
      );

      await expect(customGenerateGPTFormSchema(baseGeneratorArgs, {})).rejects.toThrow(
        'OpenAI returned an empty UI Schema. Please try again.',
      );
      await expect(generateGPTFormSchema(baseGeneratorArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
    };

    await testEmptyUISchema(null);
    await testEmptyUISchema(undefined);
    await testEmptyUISchema('');
    await testEmptyUISchema({});
  });

  it('should throw an error when failed to communicate with OpenAI', async () => {
    (openai.chat.completions.create as jest.Mock).mockRejectedValue(
      new Error('OpenAI API request exceeded rate limit'),
    );

    await expect(customGenerateGPTFormSchema(baseGeneratorArgs, {})).rejects.toThrow(
      'OpenAI API request exceeded rate limit',
    );
    await expect(generateGPTFormSchema(baseGeneratorArgs)).rejects.toThrow('Failed to communicate with OpenAI.');
  });

  it('should return a valid JSON Schema and UI Schema', async () => {
    mockOpenAIResponse(JSON.stringify(baseOpenAIResponse));

    const { json_schema, ui_schema } = await generateGPTFormSchema(baseGeneratorArgs);

    expect(json_schema).toEqual(baseOpenAIResponse.json_schema);
    expect(ui_schema).toEqual(baseOpenAIResponse.ui_schema);
  });
});
