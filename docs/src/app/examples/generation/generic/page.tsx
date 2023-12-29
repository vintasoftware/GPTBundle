'use client';

import { Text, Box, Button, Textarea, Title, LoadingOverlay, Loader, Center, Code } from '@mantine/core';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import { useState } from 'react';
import { IconForms } from '@tabler/icons-react';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function GenericSchemaGenExample() {
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
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
          Generate checklists from content:
        </Title>
        <Text mb="xs">
          Code at <Code>docs/src/app/examples/generation/generic/page.tsx</Code>
        </Text>
        <Textarea
          label="Content"
          description="Content to use for generating the form"
          placeholder="Put text or HTML content here..."
          autosize
          minRows={6}
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          mb="md"
        />
        <Textarea
          label="Prompt"
          description="Prompt to use for generating the form"
          placeholder="e.g. generate a 5 question exam to ensure the reader learned this content"
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
