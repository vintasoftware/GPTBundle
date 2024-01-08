import { openai } from '../src/actions/common';
import { generateGPTFormSchema } from '../src/actions/form-gen';

jest.mock('../src/actions/common', () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

describe('Form Generation', () => {
  it('should throw an error when OpenAI returns an empty response', async () => {
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [{ message: { content: null } }],
    });

    await expect(
      generateGPTFormSchema({
        content: 'Test content',
        prompt: 'Test prompt',
      }),
    ).rejects.toThrow('OpenAI returned an empty response. Please try again.');
  });
});
