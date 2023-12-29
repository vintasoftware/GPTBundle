'use client';

import { Text, Box, Button, Textarea, Title, LoadingOverlay, Loader, Center, Group, Code } from '@mantine/core';
import { useState } from 'react';
import { IconBrain, IconForms } from '@tabler/icons-react';
import dedent from 'dedent';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import './styles.css';
import { useFormAssistant } from '@ai-form-toolkit/client';

export default function ExamSchemaGenWithAssistantExample() {
  const defaultContent = dedent`
  Technical Requirements for the job:
  Frontend:
  - MUI
  - React
  - Redux
  - TypeScript
  - SCSS / CSS
  Backend (Django):
  - Django REST Framework
  - ORM annotations and subqueries
  - ORM query optimization
  - DB migrations
  - Celery async tasks`;
  const defaultPrompt =
    'Generate a form with a field with name `question`. ' +
    'This field should be one hard open-ended question ' +
    'to evaluate a job candidate on some of the "Technical Requirements for the job".';

  const [content, setContent] = useState(defaultContent);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [isLoading, setIsLoading] = useState(false);

  const fieldToFill = Object.keys(formSchema?.properties || {})[0] || null;
  const fieldLabels = Object.entries(formSchema?.properties || {}).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: [value.title] }),
    {},
  );

  const [formValues, setFormValues] = useState<Record<string, string>>({
    question: '',
  });
  const { fillSingleField } = useFormAssistant({
    pageTitle: 'Job Application Test',
    formGetValues: () => formValues,
    formSetValues: setFormValues,
    fieldLabels,
  });

  const onSubmit = () => {
    console.log(formValues);
  };

  return (
    <>
      <Box pos="relative" mb="md">
        <LoadingOverlay
          visible={isLoading}
          loaderProps={{
            children: (
              <>
                <Center>
                  <Loader size={16} mr={8} />
                  <Text inherit>Loading (may take up to 2 minutes)...</Text>
                </Center>
              </>
            ),
          }}
        />
        <Title order={2} mb="xs">
          Generate and then autofill form:
        </Title>
        <Text mb="xs">
          Code at <Code>docs/src/app/examples/assistant/gen-with-assistant/page.tsx</Code>
        </Text>
        <Text mb="xs">
          This form combines <Code>useGeneratedFormSchema</Code> with <Code>useFormAssistant</Code> hooks to generate a
          form from content + prompt, and then support GPT-4 autofill on it.
        </Text>
        <Textarea
          label="Full content text:"
          placeholder="Put text or HTML content here..."
          autosize
          minRows={6}
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          mb="md"
        />
        <Textarea
          label="Prompt:"
          placeholder={`e.g. ${defaultPrompt}`}
          value={prompt}
          onChange={(event) => setPrompt(event.currentTarget.value)}
          mb="md"
        />
      </Box>
      <Group justify="flex-end" mt="md" mb="md">
        {fieldToFill && (
          <Button
            variant="default"
            leftSection={isLoading ? <Loader size={14} /> : <IconBrain size={14} />}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              fillSingleField(fieldToFill).finally(() => setIsLoading(false));
            }}
          >
            Autofill missing with GPT-4
          </Button>
        )}
        <Button
          leftSection={isLoading ? <Loader color="blue" size={14} /> : <IconForms size={14} />}
          variant="outline"
          onClick={() => {
            setIsLoading(true);
            generateFormSchema(content, prompt).finally(() => setIsLoading(false));
          }}
          disabled={isLoading}
        >
          Generate Form
        </Button>
      </Group>
      <SchemaFormDemo
        formSchema={formSchema}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        formData={formValues}
        onChange={(e) => setFormValues(e.formValues)}
      />
    </>
  );
}
