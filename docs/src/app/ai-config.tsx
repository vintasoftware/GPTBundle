'use client';

import { AIFormToolkitConfig } from '@ai-form-toolkit/client';
import { generateGPTFormAutofill, generateGPTFormSchema } from '@/server/rate-limited-gen-fns';
import { useSearchParams } from 'next/navigation';

export default function RateLimitedAIFormToolkitConfig() {
  const searchParams = useSearchParams();
  const userToken = searchParams.get('token');

  return (
    <AIFormToolkitConfig
      generateFormAutofillFn={(args) => generateGPTFormAutofill(userToken, args)}
      generateFormSchemaFn={(args) => generateGPTFormSchema(userToken, args)}
    />
  );
}
