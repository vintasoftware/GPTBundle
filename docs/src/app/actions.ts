'use server';

export async function checkOpenAIKeyExists() {
  const keyExists = Boolean(process.env.OPENAI_API_KEY);
  return keyExists;
}
