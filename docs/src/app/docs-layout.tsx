'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { GlobalStyles } from '@mui/system';
import { Theme } from '@mui/material/styles';

import Layout from '@/layout';

type Props = {
  children: ReactNode;
};

export default function DocsLayout({ children }: Props) {
  const docsMarkdownStyles = (theme: Theme) => ({
    h1: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    h2: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    h3: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    h4: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    h5: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    h6: {
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
    figure: {
      margin: 0,
    },
    pre: {
      overflowX: 'auto',
      borderRadius: theme.shape.borderRadius,
      padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
    },
    'span[data-highlighted-line]': {
      borderBottomColor: '#9333EA',
      backgroundColor: '#6B21A880',
      fontWeight: 700,
      color: '#E9D5FF',
    },
    code: {
      counterReset: 'line',
      fontSize: '0.8125rem',
    },
    'code > [data-line]::before': {
      counterIncrement: 'line',
      content: 'counter(line)',
      display: 'inline-block',
      width: theme.spacing(1),
      marginRight: theme.spacing(1.5),
      textAlign: 'right',
      color: 'gray',
    },
    'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
      width: theme.spacing(2),
    },
    'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
      width: theme.spacing(3),
    },
    img: {
      width: '100%',
      height: 'auto',
      border: `2px solid ${theme.palette.grey[200]}`,
    },
    '.doc-form-example': {
      borderRadius: theme.shape.borderRadius,
      border: `2px solid ${theme.palette.grey[200]}`,
      padding: theme.spacing(1),
    },
  });

  return (
    <>
      <GlobalStyles styles={docsMarkdownStyles} />
      <Layout>
        <Box maxWidth={600} mx="auto" paddingY={4} paddingX={2.5}>
          {children}
        </Box>
      </Layout>
    </>
  );
}
