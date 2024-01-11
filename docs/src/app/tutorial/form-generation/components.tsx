'use client';

import { useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import SchemaForm from '@rjsf/mui';
import { Button, Paper, Stack, TextField } from '@mui/material';

export function BasicInputForm() {
  const [content, setContent] = useState('Name: ...\nAge: ...');
  const [prompt, setPrompt] = useState('Form to fill the missing values');

  return (
    <Paper variant="outlined">
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <TextField
          multiline
          label="Content"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <TextField multiline label="Prompt" value={prompt} onChange={(event) => setPrompt(event.currentTarget.value)} />
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
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
    <Paper variant="outlined">
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <SchemaForm schema={formSchema} uiSchema={uiSchema} validator={validator} onSubmit={() => null} />
      </Stack>
    </Paper>
  );
}

export function BasicGeneratedSchemas() {
  return (
    <CodeHighlightTabs
      code={[
        {
          fileName: 'JSONSchema.json',
          code: JSON.stringify(formSchema || {}, null, 2),
          language: 'json',
        },
        {
          fileName: 'UISchema.json',
          code: JSON.stringify(uiSchema || {}, null, 2),
          language: 'json',
        },
      ]}
      mb="md"
    />
  );
}
