'use client';

import { useState } from 'react';
import { IChangeEvent } from '@rjsf/core';
import { Link, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RJSFSchema } from '@rjsf/utils';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

export default function ChecklistSchemaGenExample() {
  const defaultPrompt = 'Generate a checklist with 10 points';

  const [content, setContent] = useState('');
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

        <Typography variant="h4">Generate checklists from content:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/checklist/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          name="content"
          label="Full content text:"
          placeholder="Put text or HTML content here..."
          helperText={
            <>
              If you don&apos;t have one, copy this{' '}
              <Link
                href="https://www.vinta.com.br/blog/celery-wild-tips-and-tricks-run-async-tasks-real-world"
                target="_blank"
              >
                blog post
              </Link>{' '}
              and paste below
            </>
          }
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
