import HolyLoader from 'holy-loader';
import React, { ReactNode } from 'react';
import MuiThemeWrapper from '@/MuiThemeWrapper';
import MDXProviderWrapper from '@/MDXProviderWrapper';
import RateLimitedAIFormToolkitConfig from './ai-config';

export const metadata = {
  title: `Build forms like it's ${Math.max(new Date().getFullYear(), 2024)} | AI Form Toolkit`,
  description: 'Toolkit to generate and enhance web forms using AI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <HolyLoader />
        <RateLimitedAIFormToolkitConfig />
        <MuiThemeWrapper>
          <MDXProviderWrapper>{children}</MDXProviderWrapper>
        </MuiThemeWrapper>
      </body>
    </html>
  );
}
