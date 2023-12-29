'use client';

import { Button, Group, Loader, Textarea, Title, Text, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBulb } from '@tabler/icons-react';
import { useState } from 'react';

import { useFormAssistant } from '@ai-form-toolkit/client';

export default function SingleFieldFormAssistant() {
  const form = useForm({
    initialValues: {
      recipe: 'Carrot cake recipe\n\nIngredients:\n\nDirections:\n\n',
    },
  });
  const { fillSingleField } = useFormAssistant({
    formTitle: 'Create Recipe',
    formGetValues: () => form.values,
    formSetValues: form.setValues,
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Title mb="md" order={2}>
        GPT-4 form assistant (single field)
      </Title>
      <Text mb="xs">
        Code at <Code>docs/src/app/examples/assistant/single-field-assistant/page.tsx</Code>
      </Text>
      <Text mb="md">
        This form uses the <Code>useFormAssistant</Code> hook to enable the GPT-4 autofill functionality. Click on the
        button below to test it!
      </Text>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Textarea
          withAsterisk
          label="Recipe"
          placeholder="Write a Recipe here"
          autosize
          minRows={10}
          {...form.getInputProps('recipe')}
          disabled={isLoading}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            leftSection={isLoading ? <Loader size={14} /> : <IconBulb size={14} />}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              fillSingleField('recipe').finally(() => setIsLoading(false));
            }}
          >
            Autofill with GPT-4
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
}
