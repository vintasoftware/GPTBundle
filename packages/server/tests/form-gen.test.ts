import {describe, expect, test} from '@jest/globals';
import { generateGPTFormSchema } from '@ai-form-toolkit/server';

test('adds 1 + 2 to equal 3', () => {
  expect(generateGPTFormSchema({
    content: "Test content",
    prompt: "Test prompt",
  })).toBe(3);
});
