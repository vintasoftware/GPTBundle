'use server';

import {
  customGenerateGPTFormAutofill,
  customGenerateGPTFormSchema,
  AssistantArgsType,
  GeneratorArgsType,
} from '@ai-form-toolkit/server';
import { kv } from '@vercel/kv';

async function decrCredit(userToken: string | null) {
  if (!userToken) {
    throw new Error('Missing user token.');
  }
  const credit = await kv.decr(`credit:${userToken}`);
  if (!credit || typeof credit != 'number' || credit < 0) {
    throw new Error('No remaining credit.');
  }
}

export async function generateGPTFormAutofill(userToken: string | null, args: AssistantArgsType) {
  decrCredit(userToken);
  return customGenerateGPTFormAutofill(args, {
    model: 'gpt-4-1106-preview',
  });
}

export async function generateGPTFormSchema(userToken: string | null, args: GeneratorArgsType) {
  decrCredit(userToken);
  return customGenerateGPTFormSchema(args, {
    model: 'gpt-4-1106-preview',
  });
}
