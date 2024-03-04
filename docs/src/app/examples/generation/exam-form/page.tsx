'use client';

import { useState } from 'react';
import { Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import dedent from 'dedent';

import { useRequestDialog } from '../../../requestDialog';
import { useGeneratedFormSchema } from '@gptbundle/client';
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
    'Generate an exam with hard multiple choice technical questions' +
    ' with wrong answers along with the right one to assess the knowledge' +
    ' of a job candidate on all the "Technical Requirements for the job".';

  const [content, setContent] = useState(defaultContent);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = ({ formData }: IChangeEvent<any, RJSFSchema>) => {
    console.log(formData);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <LoadingBackdrop open={isLoading} />
        <Typography variant="h4">Exam Form Creator:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/exam-form/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          name="content"
          label="Full content text:"
          placeholder="Put text or HTML content here..."
          minRows={6}
          value={content}
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
          if (!content.trim() || !prompt.trim()) {
            setOpenSnackbar(true);
          } else {
            requestDialog(() => generateFormSchema(content, prompt));
          }
        }}
        sx={{ alignSelf: 'flex-end' }}
      >
        Generate Form
      </LoadingButton>
      <SchemaFormDemo formSchema={formSchema} uiSchema={uiSchema} onSubmit={onSubmit} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="warning" variant="filled" sx={{ width: '100%' }}>
          Please fill in the missing fields.
        </Alert>
      </Snackbar>
      {renderDialog()}
    </Stack>
  );
}
