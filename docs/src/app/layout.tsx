import HolyLoader from 'holy-loader';
import React, { ReactNode } from 'react';
import { AIFormToolkitConfig } from '@ai-form-toolkit/client';
import {
  customGenerateGPTFormAutofill,
  customGenerateGPTFormSchema,
  AssistantArgsType,
  GeneratorArgsType,
} from '@ai-form-toolkit/server';
import MuiThemeWrapper from '@/MuiThemeWrapper';
import MDXProviderWrapper from '@/MDXProviderWrapper';

export const metadata = {
  title: `Build forms like it's ${Math.max(new Date().getFullYear(), 2024)} | GPTBundle`,
  description: 'Toolkit to generate and enhance web forms using AI.',
};

async function myGenerateGPTFormAutofill(args: AssistantArgsType) {
  'use server';

  return customGenerateGPTFormAutofill(args, {
    model: 'gpt-4-1106-preview',
  });
}

async function myGenerateGPTFormSchema(args: GeneratorArgsType) {
  'use server';

  return customGenerateGPTFormSchema(args, {
    model: 'gpt-4-1106-preview',
  });
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.webp" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <HolyLoader />
        <AIFormToolkitConfig
          generateFormAutofillFn={myGenerateGPTFormAutofill}
          generateFormSchemaFn={myGenerateGPTFormSchema}
        />
        <MuiThemeWrapper>
          <MDXProviderWrapper>{children}</MDXProviderWrapper>
        </MuiThemeWrapper>
      </body>
    </html>
  );
}
