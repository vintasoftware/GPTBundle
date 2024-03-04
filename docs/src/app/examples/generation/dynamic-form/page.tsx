'use client';

import { useState } from 'react';
import { Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import { useRequestDialog } from '../../../requestDialog';
import { useGeneratedFormSchema } from '@gptbundle/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

export default function GenericSchemaGenExample() {
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = ({ formData }: IChangeEvent<any, RJSFSchema>) => {
    console.log(formData);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2}>
        <LoadingBackdrop open={isLoading} />

        <Typography variant="h4">Dynamic Form Creator</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/dynamic-form/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          name="content"
          label="Content"
          helperText="Content to use for generating the form"
          placeholder="Put text or HTML content here..."
          minRows={6}
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <TextField
          multiline
          fullWidth
          name="prompt"
          label="Prompt"
          helperText="Prompt to use for generating the form"
          placeholder="e.g. generate a 5 question exam to ensure the reader learned this content"
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
