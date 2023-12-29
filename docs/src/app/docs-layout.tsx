'use client';

import { ReactNode } from 'react';
import { Box, rem } from '@mantine/core';

import Layout from '@/layout';

import './docs-styles.css';

type Props = {
  children: ReactNode;
};

export default function DocsLayout({ children }: Props) {
  return (
    <Layout>
      <Box maw={600} mx="auto" pb={rem(30)}>
        {children}
      </Box>
    </Layout>
  );
}
