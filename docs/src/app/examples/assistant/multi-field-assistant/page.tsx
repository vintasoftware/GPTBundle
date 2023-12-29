'use client';

import {
  Autocomplete,
  Box,
  Button,
  Group,
  Loader,
  TextInput,
  Textarea,
  Title,
  Text,
  Code,
  ActionIcon,
  List,
} from '@mantine/core';
import { IconBrain, IconWand } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { useFormAssistant } from '@ai-form-toolkit/client';

const CATEGORY_CHOICES = ['Bug', 'Feature', 'Improvement'];
const PRIORITY_CHOICES = ['High', 'Medium', 'Low'];

export default function MultiFieldFormAssistant() {
  const form = useForm({
    initialValues: {
      title: 'Fix N+1s in Django codebase',
      description: 'Use prefetch...',
      category: '',
      priority: '',
    },
    validate: {
      category: (value) => (CATEGORY_CHOICES.includes(value) ? null : 'Pick a valid category'),
      priority: (value) => (PRIORITY_CHOICES.includes(value) ? null : 'Pick a valid priority'),
    },
  });
  const { fillSingleField, fillFields } = useFormAssistant({
    formTitle: 'Create Issue',
    formGetValues: () => form.values,
    formSetValues: form.setValues,
    fieldChoices: {
      category: CATEGORY_CHOICES,
      priority: PRIORITY_CHOICES,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  return (
    <>
      <Title mb="md" order={2}>
        GPT-4 form assistant (multi field)
      </Title>
      <Text mb="xs">
        Code at <Code>docs/src/app/examples/assistant/multi-field-assistant/page.tsx</Code>
      </Text>
      <Text mb="xs">
        This form uses the <Code>useFormAssistant</Code> hook to enable the GPT-4 autofill functionality in two ways:
      </Text>
      <List type="ordered" mb="xs">
        <List.Item>The "magic wand" button on description field can enhance whatever text you put there.</List.Item>
        <List.Item>The "Autofill missing with GPT-4" button will fill all the missing fields in the form.</List.Item>
      </List>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Write the title here"
          {...form.getInputProps('title')}
          disabled={isLoading}
          mb="xs"
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="Write the description here"
          autosize
          minRows={4}
          rightSection={
            <ActionIcon
              variant="outline"
              color="grey"
              aria-label="Enhance"
              loading={isLoadingDescription}
              onClick={() => {
                setIsLoadingDescription(true);
                fillSingleField('description').finally(() => setIsLoadingDescription(false));
              }}
            >
              <IconWand style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          }
          {...form.getInputProps('description')}
          disabled={isLoading}
          mb="xs"
        />
        <Autocomplete
          withAsterisk
          label="Category"
          placeholder="Pick a category"
          data={CATEGORY_CHOICES}
          {...form.getInputProps('category')}
          disabled={isLoading}
          mb="xs"
        />
        <Autocomplete
          withAsterisk
          label="Priority"
          placeholder="Pick a priority"
          data={PRIORITY_CHOICES}
          {...form.getInputProps('priority')}
          disabled={isLoading}
          mb="xs"
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="default"
            leftSection={isLoading ? <Loader size={14} /> : <IconBrain size={14} />}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              fillFields().finally(() => setIsLoading(false));
            }}
          >
            Autofill missing with GPT-4
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
}
