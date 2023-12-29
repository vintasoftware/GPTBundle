'use client';

import { Box, Button, Textarea } from '@mantine/core';
import { useState } from 'react';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import SchemaForm from '@/components/Forms/SchemaForm';

export function BasicInputForm() {
  const [content, setContent] = useState('Name: ...\nAge: ...');
  const [prompt, setPrompt] = useState('Form to fill the missing values');

  return (
    <>
      <Box mb="md" className="doc-form-example">
        <Textarea
          label="Content"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          mb="md"
        />
        <Textarea
          label="Prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.currentTarget.value)}
          mb="md"
        />
        <Button variant="outline">
          Generate Form
        </Button>
      </Box>
    </>
  );
}

const formSchema: RJSFSchema = {
  title: 'Personal Information Form',
  description: 'Form to collect name and age',
  type: 'object',
  required: [
    'name',
    'age',
  ],
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
  return <SchemaForm
    schema={formSchema}
    uiSchema={uiSchema}
    validator={validator}
    onSubmit={() => null}
    className="doc-form-example"
  />;
}

export function BasicGeneratedSchemas() {
  return <CodeHighlightTabs
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
    />;
}
