import { generateGPTFormAutofill } from '../src/actions/form-assistant';
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

const baseAssistantArgs = {
  pageTitle: 'Test Page Title',
  formTitle: 'Create Issue',
  fieldsToFill: ['category', 'priority'],
  fields: {
    title: 'Fix N+1s in Django codebase',
    description: 'Use prefetch...',
    category: '',
    priority: '',
  },
  fieldLabels: {},
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
  it('should throw an error when OpenAI returns an empty response', async () => {
    mockOpenAIResponse(null);

    await expect(generateGPTFormAutofill(baseAssistantArgs)).rejects.toThrow(
      'OpenAI returned an empty response. Please try again.',
    );
  });

  it('should throw an error when OpenAI returns an empty Autofill Fields', async () => {
    const testEmptyAutofillFields = (schema: any) => {
      mockOpenAIResponse(
        JSON.stringify({
          fields: schema,
        }),
      );

      return expect(generateGPTFormAutofill(baseAssistantArgs)).rejects.toThrow(
        'OpenAI returned an empty Autofill Fields. Please try again.',
      );
    };

    await testEmptyAutofillFields(null);
    await testEmptyAutofillFields(undefined);
    await testEmptyAutofillFields([]);
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
