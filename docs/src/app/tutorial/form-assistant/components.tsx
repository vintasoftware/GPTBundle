import { useState } from 'react';
import { Button, Paper, Stack, TextField } from '@mui/material';

const AI_GENERATED_RECIPE =
  'Hummus quick recipe: ' +
  'This recipe uses canned chickpeas, tahini, lemon juice, garlic, and olive oil. ' +
  'Simply blend all the ingredients together in a food processor until smooth. ' +
  'Add water as needed to reach desired consistency. ' +
  'Season with salt and serve with a drizzle of olive oil, ' +
  'a sprinkle of paprika, and some whole chickpeas for garnish.';

export function BasicSingleFieldForm() {
  const [formValues, setFormValues] = useState<Record<string, string>>({ recipe: AI_GENERATED_RECIPE });

  return (
    <Paper variant="outlined">
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <TextField
          multiline
          value={formValues.recipe}
          onChange={(e) => setFormValues({ ...formValues, recipe: e.target.value })}
        />

        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Autofill with GPT-4
        </Button>
      </Stack>
    </Paper>
  );
}

export function BasicMultiFieldForm() {
  const [formValues, setFormValues] = useState({
    recipe: 'Hummus quick recipe:\nIngredients: ...\nDirections: ...',
    duration: '20 minutes',
    cost: '$',
  });

  return (
    <Paper variant="outlined">
      <Stack spacing={3} paddingX={2} paddingY={3}>
        <TextField
          multiline
          label="Recipe"
          value={formValues.recipe}
          onChange={(e) => setFormValues({ ...formValues, recipe: e.target.value })}
        />
        <TextField
          label="Duration"
          value={formValues.duration}
          onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
        />
        <TextField
          label="Cost"
          value={formValues.cost}
          onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
        />

        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Autofill with GPT-4
        </Button>
      </Stack>
    </Paper>
  );
}
