'use client';

import { Box } from '@mui/material';
import docsMarkdownStyles from './docs-markdown-styles';
import Layout from '@/layout';
import { GlobalStyles } from '@mui/system';

import GettingStarted from '../../src/app/tutorial/getting-started.mdx';
import FormAssistant from '../../src/app/tutorial/form-assistant/content.mdx';
import FormCreators from '../../src/app/tutorial/form-generation/content.mdx';

const boxStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: '8px',
  paddingBottom: '32px',
  paddingLeft: '20px',
  paddingRight: '20px',
  maxWidth: '815px',
};

export default function HomePage() {
  return (
    <>
      <GlobalStyles styles={docsMarkdownStyles} />
      <Layout>
        <Box sx={boxStyles}>
          <GettingStarted />
          <FormCreators />
          <FormAssistant />
        </Box>
      </Layout>
    </>
  );
}
