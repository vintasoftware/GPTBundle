'use client';

import { Text, Box, Button, Textarea, Title, LoadingOverlay, Loader, Center, Code } from '@mantine/core';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import { useState } from 'react';
import { IconForms } from '@tabler/icons-react';
import dedent from 'dedent';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function ERSchemaGenExample() {
  const defaultContent = dedent`
  erDiagram
    USER ||--o{ TASK : has
    USER {
      string email PK
      string name
    }
    TASK ||--|{ SUBTASK : contains
    TASK {
        string title
        string description
        int priority
        date dueDate
    }
    SUBTASK {
        string title
    }
  `;
  const defaultPrompt = 'Generate a form to create tasks with subtasks for this ER model';

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
          Generate forms from{' '}
          <a href="https://mermaid.js.org/syntax/entityRelationshipDiagram.html" target="_blank" rel="noreferrer">
            Mermaid ER diagrams
          </a>
          :
        </Title>
        <Text mb="xs">
          Code at <Code>docs/src/app/examples/generation/entity-relationship/page.tsx</Code>
        </Text>
        <Textarea
          label="Mermaid diagram for Entity-Relationship Model:"
          placeholder="Put Mermaid text here..."
          value={content}
          autosize
          minRows={6}
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
