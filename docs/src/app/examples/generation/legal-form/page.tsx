'use client';

import { useState } from 'react';
import { Stack, TextField, Typography, Snackbar, Alert, Link } from '@mui/material';
import { IChangeEvent } from '@rjsf/core';
import { LoadingButton } from '@mui/lab';
import { RJSFSchema } from '@rjsf/utils';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

import { useRequestDialog } from '../../../requestDialog';
import { useGeneratedFormSchema } from '@gptbundle/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

export default function LegalSchemaGenExample() {
  const defaultPrompt = 'Generate a form for filling the missing fields in this contract';
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();

  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = ({ formData }: IChangeEvent<any, RJSFSchema>) => {
    console.log(formData);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <LoadingBackdrop open={isLoading} />
        <Typography variant="h4">Legal Contracts Creator</Typography>
        <Typography>Generate forms for data collection from existing contracts:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/legal/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          name="content"
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
