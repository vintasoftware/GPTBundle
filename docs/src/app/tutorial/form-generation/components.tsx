'use client';

import { useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import SchemaForm from '@rjsf/mui';
import { Button, Paper, Stack, TextField } from '@mui/material';
import SchemaJsonTabs from '@/components/Forms/SchemaJsonTabs';
import { Box } from '@mui/system';

export function BasicInputForm() {
  const [content, setContent] = useState('Name: ...\nAge: ...');
  const [prompt, setPrompt] = useState('Form to fill the missing values');

  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: '#12111a',
        border: 'none',
        padding: '10px',
      }}
    >
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <TextField
          multiline
          disabled
          label="Content"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <TextField
          multiline
          label="Prompt"
          value={prompt}
          disabled
          onChange={(event) => setPrompt(event.currentTarget.value)}
        />
        <Button variant="outlined" disabled sx={{ alignSelf: 'flex-start' }}>
          Generate Form
        </Button>
      </Stack>
    </Paper>
  );
}

const formSchema: RJSFSchema = {
  title: 'Personal Information Form',
  description: 'Form to collect name and age',
  type: 'object',
  required: ['name', 'age'],
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
  },
};

const uiSchema = {
  name: {
    'ui:widget': 'text',
  },
  age: {
    'ui:widget': 'updown',
  },
};

export function BasicGeneratedForm() {
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: '#12111a',
        border: 'none',
        padding: '10px',
      }}
    >
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <SchemaForm schema={formSchema} uiSchema={uiSchema} disabled validator={validator} onSubmit={() => null} />
      </Stack>
    </Paper>
  );
}

export function BasicGeneratedSchemas() {
  return (
    <Box
      sx={{
        backgroundColor: '#12111a',
        border: 'none',
        padding: '10px',
      }}
    >
      <SchemaJsonTabs formSchema={formSchema} uiSchema={uiSchema} />
    </Box>
  );
}
