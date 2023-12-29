'use client';

import { Text, Box, Button, Textarea, Title, LoadingOverlay, Loader, Center, Anchor, Code } from '@mantine/core';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import { useState } from 'react';
import { IconForms } from '@tabler/icons-react';
import dedent from 'dedent';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function ExamSchemaGenExample() {
  const defaultContent = dedent`Technical Requirements for the job:
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
    'Generate a exam with hard multiple choice technical questions ' +
    'to assess the knowledge of a job candidate on all of the ' +
    '"Technical Requirements for the job".';

  const [content, setContent] = useState(defaultContent);
  const [prompt, setPrompt] = useState(defaultPrompt);
  const { formSchema, uiSchema, generateFormSchema } = useGeneratedFormSchema();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ formData }: IChangeEvent<any, RJSFSchema>) => {
    console.log(formData);
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
          Generate Exam forms:
        </Title>
        <Text mb="xs">
          Code at <Code>docs/src/app/examples/generation/exam/page.tsx</Code>
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
      <Button
        leftSection={isLoading ? <Loader color="blue" size={14} /> : <IconForms size={14} />}
        variant="outline"
        onClick={() => {
          setIsLoading(true);
          generateFormSchema(content, prompt).finally(() => setIsLoading(false));
        }}
        disabled={isLoading}
        mb="md"
      >
        Generate Form
      </Button>
      <SchemaFormDemo formSchema={formSchema} uiSchema={uiSchema} onSubmit={onSubmit} />
    </>
  );
}
