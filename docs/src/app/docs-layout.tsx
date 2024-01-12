'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

import Layout from '@/layout';

import './docs-styles.css';

type Props = {
  children: ReactNode;
};

export default function DocsLayout({ children }: Props) {
  return (
    <Layout>
      <Box maxWidth={600} mx="auto" paddingY={4} paddingX={2.5}>
        {children}
      </Box>
    </Layout>
  );
}
