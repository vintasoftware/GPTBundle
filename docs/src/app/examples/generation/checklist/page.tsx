'use client';

import { useState } from 'react';
import { IChangeEvent } from '@rjsf/core';
import { Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { RJSFSchema } from '@rjsf/utils';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';

import { useRequestDialog } from '../../../requestDialog';
import { useGeneratedFormSchema } from '@gptbundle/client';
import LoadingBackdrop from '@/components/Examples/LoadingBackdrop';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

export default function ChecklistSchemaGenExample() {
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();
  const defaultPrompt = 'Generate a detailed checklist with checkmarks.';

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
        <Typography variant="h4">Checklist Creator:</Typography>
        <Typography>Generate checklists from content:</Typography>
        <Typography variant="body1">
          Code at <code>docs/src/app/examples/generation/checklist/page.tsx</code>
        </Typography>

        <TextField
          multiline
          fullWidth
          required={true}
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
          required={true}
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
        Generate Checklist
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
