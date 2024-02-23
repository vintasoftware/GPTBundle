'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import docsMarkdownStyles from './docs-markdown-styles';

import Layout from '@/layout';

type Props = {
  children: ReactNode;
};

export default function DocsLayout({ children }: Props) {
  return (
    <>
      <GlobalStyles styles={docsMarkdownStyles} />
      <Layout>
        <Box maxWidth={600} mx="auto" paddingTop={1} paddingBottom={4} paddingX={2.5}>
          {children}
        </Box>
      </Layout>
    </>
  );
}
