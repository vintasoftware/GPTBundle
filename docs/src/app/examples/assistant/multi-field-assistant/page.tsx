'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, IconButton, TextField, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';

import { useFormAssistant } from '@ai-form-toolkit/client';

const CATEGORY_CHOICES = ['Bug', 'Feature', 'Improvement'];
const PRIORITY_CHOICES = ['High', 'Medium', 'Low'];

export default function MultiFieldFormAssistant() {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: 'Fix N+1s in Django codebase',
    description: 'Use prefetch...',
    category: '',
    priority: '',
  });

  const { fillSingleField, fillFields } = useFormAssistant({
    formTitle: 'Create Issue',
    formGetValues: () => formValues,
    formSetValues: setFormValues,
    fieldChoices: {
      category: CATEGORY_CHOICES,
      priority: PRIORITY_CHOICES,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formValues);
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="Enhance"
                  size="large"
                  disabled={isLoadingDescription}
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
            renderInput={(params) => (
              <TextField
                {...params}
                required
                name="category"
                label="Category"
                placeholder="Pick a category"
                value={formValues.category}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            )}
          />
          <Autocomplete
            options={PRIORITY_CHOICES}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                name="priority"
                label="Priority"
                placeholder="Pick a priority"
                value={formValues.priority}
                onChange={handleInputChange}
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
              onClick={() => {
                setIsLoading(true);
                fillFields().finally(() => setIsLoading(false));
              }}
            >
              Autofill missing with GPT-4
            </LoadingButton>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
