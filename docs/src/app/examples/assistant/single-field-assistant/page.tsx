'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

import { useFormAssistant } from '@ai-form-toolkit/client';

export default function SingleFieldFormAssistant() {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    recipe: 'Carrot cake recipe\n\nIngredients:\n\nDirections:\n\n',
  });
  const { fillSingleField } = useFormAssistant({
    formTitle: 'Create Recipe',
    formGetValues: () => formValues,
    formSetValues: setFormValues,
  });
  const [isLoading, setIsLoading] = useState(false);

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
      <Typography variant="h4">GPT-4 form assistant (single field)</Typography>
      <Typography variant="body1">
        Code at <code>docs/src/app/examples/assistant/single-field-assistant/page.tsx</code>
      </Typography>
      <Typography variant="body1">
        This form uses the <code>useFormAssistant</code> hook to enable the GPT-4 autofill functionality. Click on the
        button below to test it!
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
              loading={isLoading}
              startIcon={<TipsAndUpdatesOutlinedIcon />}
              onClick={() => {
                setIsLoading(true);
                fillSingleField('recipe').finally(() => setIsLoading(false));
              }}
            >
              Autofill with GPT-4
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
