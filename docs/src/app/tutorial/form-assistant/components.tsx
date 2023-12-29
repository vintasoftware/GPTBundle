import { Box, Button, Group, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';

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
    <Box mb="md" className="doc-form-example">
      <Textarea
        autosize
        value={formValues.recipe}
        onChange={(e) => setFormValues({ ...formValues, recipe: e.target.value })}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default">Autofill with GPT-4</Button>
      </Group>
    </Box>
  );
}

export function BasicMultiFieldForm() {
  const [formValues, setFormValues] = useState({
    recipe: 'Hummus quick recipe:\nIngredients: ...\nDirections: ...',
    duration: '20 minutes',
    cost: '$',
  });

  return (
    <Box mb="md" className="doc-form-example">
      <Textarea
        label="Recipe"
        autosize
        value={formValues.recipe}
        onChange={(e) => setFormValues({ ...formValues, recipe: e.target.value })}
        mb="xs"
      />
      <TextInput
        label="Duration"
        value={formValues.duration}
        onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
        mb="xs"
      />
      <TextInput
        label="Cost"
        value={formValues.cost}
        onChange={(e) => setFormValues({ ...formValues, duration: e.target.value })}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="outline">Autofill with GPT-4</Button>
      </Group>
    </Box>
  );
}
