'use client';

import { FormEvent, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, IconButton, TextField, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

import { useRequestDialog } from '../../../requestDialog';
import { useFormAssistant } from '@ai-form-toolkit/client';

const CATEGORY_CHOICES = ['Bug', 'Feature', 'Improvement'];
const PRIORITY_CHOICES = ['High', 'Medium', 'Low'];

export default function MultiFieldFormAssistant() {
  const { requestDialog, renderDialog, isLoading } = useRequestDialog();
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: 'Fix N+1s in Django codebase',
    description: 'Use prefetch...',
    category: '',
    priority: '',
  });

  const { fillSingleField, fillFields } = useFormAssistant({
    formTitle: 'Create Issue',
    formGetValues: () => formValues,
    formSetValues: (newValues: Record<string, string>) =>
      setFormValues({
        ...formValues,
        ...newValues,
      }),
    fieldChoices: {
      category: CATEGORY_CHOICES,
      priority: PRIORITY_CHOICES,
    },
  });

  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  const handleInputChange = (name: string, value: string | null) => {
    setFormValues({
      ...formValues,
      [name]: value || '',
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">GPT-4 form assistant (multi field)</Typography>
      <Typography variant="body1">
        Code at <code>docs/src/app/examples/assistant/multi-field-assistant/page.tsx</code>
      </Typography>
      <Typography variant="body1">
        This form uses the <code>useFormAssistant</code> hook to enable the GPT-4 autofill functionality in two ways:
      </Typography>

      <Box component="ol">
        <Typography component="li" variant="body1">
          The &quot;magic wand&quot; button on description field can enhance whatever text you put there.
        </Typography>
        <Typography component="li" variant="body1">
          The &quot;Autofill missing with GPT-4&quot; button will fill all the missing fields in the form.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            name="title"
            label="Title"
            placeholder="Write the title here"
            disabled={isLoading}
            value={formValues.title}
            onChange={(event) => handleInputChange('title', event.target.value)}
          />
          <TextField
            required
            multiline
            fullWidth
            name="description"
            label="Description"
            placeholder="Write the description here"
            minRows={4}
            value={formValues.description}
            onChange={(event) => handleInputChange('description', event.target.value)}
            disabled={isLoading || isLoadingDescription}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="Enhance"
                  size="large"
                  disabled={isLoading || isLoadingDescription}
                  onClick={() => {
                    setIsLoadingDescription(true);
                    fillSingleField('description').finally(() => setIsLoadingDescription(false));
                  }}
                >
                  {isLoadingDescription ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighOutlinedIcon />}
                </IconButton>
              ),
            }}
          />
          <Autocomplete
            options={CATEGORY_CHOICES}
            value={formValues.category}
            onChange={(_, value) => handleInputChange('category', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                name="category"
                label="Category"
                placeholder="Pick a category"
                disabled={isLoading}
              />
            )}
          />
          <Autocomplete
            options={PRIORITY_CHOICES}
            value={formValues.priority}
            onChange={(_, value) => handleInputChange('priority', value)}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                name="priority"
                label="Priority"
                placeholder="Pick a priority"
                disabled={isLoading}
              />
            )}
          />

          <Stack direction="row" spacing={2} alignSelf="flex-end">
            <LoadingButton
              variant="outlined"
              loadingPosition="start"
              loading={isLoading}
              startIcon={<PsychologyOutlinedIcon />}
              disabled={isLoading || isLoadingDescription}
              onClick={() => {
                requestDialog(() => fillFields());
              }}
            >
              Autofill missing with GPT-4
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
