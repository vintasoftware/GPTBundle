'use client';

import { useState } from 'react';
import { Backdrop, TextField, Typography, Stack, CircularProgress, Link } from '@mui/material';
import { IChangeEvent } from '@rjsf/core';
import { LoadingButton } from '@mui/lab';
import { RJSFSchema } from '@rjsf/utils';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function LegalSchemaGenExample() {
  const defaultPrompt = 'Generate a form for filling the missing fields in this contract';

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
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <Stack direction="row" spacing={1}>
            <CircularProgress color="inherit" size={20} />
            <Typography variant="body1">Loading (may take up to 2 minutes)...</Typography>
          </Stack>
        </Backdrop>

        <Typography variant="h4">Generate forms for data collection from existing contracts / agreements:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/legal/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          label="Full contract text:"
          placeholder="Put text or HTML content here..."
          helperText={
            <>
              If you don&apos;t have one, copy this{' '}
              <Link href="https://www.vertex42.com/WordTemplates/lease-agreement-template.html" target="_blank">
                doc
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
