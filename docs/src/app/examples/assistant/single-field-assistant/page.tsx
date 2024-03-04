'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { useRequestDialog } from '../../../requestDialog';
import { useFormAssistant } from '@ai-form-toolkit/client';
import { h2Styles, boxForms } from '../../../../app/examples/formStyles';

export default function SingleFieldFormAssistant() {
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();

  const [formValues, setFormValues] = useState<Record<string, string>>({
    recipe: 'Carrot cake recipe\n\nIngredients:\n\nDirections:\n\n',
  });

  const { fillSingleField } = useFormAssistant({
    formTitle: 'Create Recipe',
    formGetValues: () => formValues,
    formSetValues: setFormValues,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={2} sx={{ ...boxForms }}>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 400,
          fontSize: '2.125rem',
          lineHeight: 1.235,
          marginTop: '16px!important',
        }}
      >
        Auto-fill Form Button
      </Typography>
      <Typography variant="h2" sx={{ ...h2Styles }}>
        Single field Form
      </Typography>
      <Typography variant="body1">
        Code at <code>docs/src/app/examples/assistant/single-field-assistant/page.tsx</code>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            multiline
            fullWidth
            name="recipe"
            label="Recipe"
            placeholder="Write a Recipe here"
            minRows={10}
            disabled={isLoading}
            value={formValues.recipe}
            onChange={handleInputChange}
          />

          <Stack direction="row" spacing={2} alignSelf="flex-end">
            <LoadingButton
              variant="outlined"
              loadingPosition="start"
              startIcon={<TipsAndUpdatesOutlinedIcon />}
              loading={isLoading}
              onClick={() => requestDialog(() => fillSingleField('recipe'))}
            >
              Autofill with GPT-4
            </LoadingButton>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      {renderDialog()}
    </Stack>
  );
}
