import { openai } from '../src/actions/common';

export const mockOpenAIResponse = (value: any) =>
  (openai.chat.completions.create as jest.Mock).mockResolvedValue({
    choices: [{ message: { content: value } }],
  });
