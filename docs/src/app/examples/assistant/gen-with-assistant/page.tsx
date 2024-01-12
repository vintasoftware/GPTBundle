'use client';

import { useState } from 'react';
import dedent from 'dedent';
import { Backdrop, CircularProgress, TextField, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

import { useGeneratedFormSchema, useFormAssistant } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import './styles.css';

export default function ExamSchemaGenWithAssistantExample() {
  const defaultContent = dedent`
  Technical Requirements for the job:
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
    'Generate a form with a field with name `question`. ' +
    'This field should be one hard open-ended question ' +
    'to evaluate a job candidate on some of the "Technical Requirements for the job".';

  const [content, setContent] = useState(defaultContent);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [isLoading, setIsLoading] = useState(false);

  const fieldToFill = Object.keys(formSchema?.properties || {})[0] || null;
  const fieldLabels = Object.entries(formSchema?.properties || {}).reduce((acc, [key, value]) => {
    value = value as unknown as { title: string };
    return { ...acc, [key]: [value.title] };
  }, {});

  const [formValues, setFormValues] = useState<Record<string, string>>({
    question: '',
  });
  const { fillSingleField } = useFormAssistant({
    pageTitle: 'Job Application Test',
    formGetValues: () => formValues,
    formSetValues: setFormValues,
    fieldLabels,
  });

  const onSubmit = () => {
    console.log(formValues);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <Stack direction="row" spacing={1}>
            <CircularProgress color="inherit" size={20} />
            <Typography variant="body1">Loading (may take up to 2 minutes)...</Typography>
          </Stack>
        </Backdrop>

        <Typography variant="h4">Generate and then autofill form:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/assistant/gen-with-assistant/page.tsx</code>
        </Typography>
        <Typography variant="body1">
          This form combines <code>useGeneratedFormSchema</code> with <code>useFormAssistant</code> hooks to generate a
          form from content + prompt, and then support GPT-4 autofill on it.
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

      <Stack direction="row" spacing={2} alignSelf="flex-end">
        {fieldToFill && (
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            loading={isLoading}
            startIcon={<PsychologyOutlinedIcon />}
            onClick={() => {
              setIsLoading(true);
              fillSingleField(fieldToFill).finally(() => setIsLoading(false));
            }}
          >
            Autofill missing with GPT-4
          </LoadingButton>
        )}
        <LoadingButton
          variant="outlined"
          loadingPosition="start"
          loading={isLoading}
          startIcon={<ListAltOutlinedIcon />}
          onClick={() => {
            setIsLoading(true);
            generateFormSchema(content, prompt).finally(() => setIsLoading(false));
          }}
        >
          Generate Form
        </LoadingButton>
      </Stack>

      <SchemaFormDemo
        formSchema={formSchema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        // @ts-ignore
        formData={formValues}
        // @ts-ignore
        onChange={(e) => setFormValues(e.formValues)}
      />
    </Stack>
  );
}
