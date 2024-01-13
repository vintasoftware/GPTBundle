'use client';

import { useState } from 'react';
import { Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import dedent from 'dedent';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function ERSchemaGenExample() {
  const defaultContent = dedent`
  erDiagram
    USER ||--o{ TASK : has
    USER {
      string email PK
      string name
    }
    TASK ||--|{ SUBTASK : contains
    TASK {
        string title
        string description
        int priority
        date dueDate
    }
    SUBTASK {
        string title
    }
  `;
  const defaultPrompt = 'Generate a form to create tasks with subtasks for this ER model';

  const [content, setContent] = useState(defaultContent);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ formData }: IChangeEvent<any, RJSFSchema>) => {
    console.log(formData);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <LoadingBackdrop open={isLoading} />

        <Typography variant="h4">
          Generate forms from{' '}
          <Link href="https://mermaid.js.org/syntax/entityRelationshipDiagram.html" target="_blank" underline="hover">
            Mermaid ER diagrams
          </Link>
          :
        </Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/entity-relationship/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          name="content"
          label="Mermaid diagram for Entity-Relationship Model:"
          placeholder="Put Mermaid text here..."
          value={content}
          minRows={6}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <TextField
          multiline
          fullWidth
          name="prompt"
          label="Prompt:"
          placeholder={`e.g. ${defaultPrompt}`}
          value={prompt}
          onChange={(event) => setPrompt(event.currentTarget.value)}
        />
      </Stack>

      <LoadingButton
        variant="outlined"
        loadingPosition="start"
        loading={isLoading}
        startIcon={<ListAltOutlinedIcon />}
        onClick={() => {
          setIsLoading(true);
          generateFormSchema(content, prompt).finally(() => setIsLoading(false));
        }}
        sx={{ alignSelf: 'flex-end' }}
      >
        Generate Form
      </LoadingButton>
      <SchemaFormDemo formSchema={formSchema} uiSchema={uiSchema} onSubmit={onSubmit} />
    </Stack>
  );
}
