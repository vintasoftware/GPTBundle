'use client';

import { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import dedent from 'dedent';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

export default function ExamSchemaGenExample() {
  const defaultContent = dedent`Technical Requirements for the job:
  Frontend:
  - MUI
  - React
  - Redux
  - TypeScript
  - SCSS / CSS
  Backend (Django):
  - Django REST Framework
  - ORM annotations and subqueries
  - ORM query optimization
  - DB migrations
  - Celery async tasks`;
  const defaultPrompt =
    'Generate a exam with hard multiple choice technical questions ' +
    'to assess the knowledge of a job candidate on all of the ' +
    '"Technical Requirements for the job".';

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

        <Typography variant="h4">Generate Exam forms:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/exam/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          label="Full content text:"
          placeholder="Put text or HTML content here..."
          minRows={6}
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <TextField
          multiline
          fullWidth
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
