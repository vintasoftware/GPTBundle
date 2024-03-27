import HolyLoader from 'holy-loader';
import React, { ReactNode } from 'react';
import { GptBundleConfig } from '@gptbundle/client';
import {
  customGenerateGPTFormAutofill,
  customGenerateGPTFormSchema,
  AssistantArgsType,
  GeneratorArgsType,
} from '@gptbundle/server';
import MuiThemeWrapper from '@/MuiThemeWrapper';
import MDXProviderWrapper from '@/MDXProviderWrapper';

export const metadata = {
  title: 'GPTBundle Docs - Power Up Your Projects with the best GPT-4 Next.js Feature Kit',
  description:
    'Introducing GPTBundle, the ultimate GPT-4 open-source feature pack for tech founders, web developers, and CTOs in 2024. Seamlessly integrate AI capabilities into your projects with our free toolkit designed for dynamic form generation, AI-assisted filling, and more. Get your AI feature up and running right now!',
  openGraph: {
    images:
      'https://assets-global.website-files.com/65d37820cd9751ef4350eeab/65e227c42db6345bbe8977be_newsletter_thumbnail%20(2).webp',
  },
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
        <GptBundleConfig
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
