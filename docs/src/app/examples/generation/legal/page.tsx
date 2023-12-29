'use client';

import {
  Text,
  Box,
  Button,
  Textarea,
  Title,
  Anchor,
  LoadingOverlay,
  Loader,
  Center,
  Code,
} from '@mantine/core';
import { RJSFSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';
import { useState } from 'react';
import { IconForms } from '@tabler/icons-react';

import { useGeneratedFormSchema } from '@ai-form-toolkit/client';
import SchemaFormDemo from '@/components/Forms/SchemaFormDemo';

import '../styles.css';

export default function LegalSchemaGenExample() {
  const defaultPrompt = 'Generate a form for filling the missing fields in this contract';

  const [content, setContent] = useState('');
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
          <Title order={2} mb="md">
            Generate forms for data collection from existing contracts / agreements:
          </Title>
          <Text mb="xs">Code at <Code>docs/src/app/examples/generation/legal/page.tsx</Code></Text>
          <Textarea
            label="Full contract text:"
            placeholder="Put text or HTML content here..."
            description={
              <>
                If you don&apos;t have one, copy this{' '}
                <Anchor
                  inherit
                  href="https://www.vertex42.com/WordTemplates/lease-agreement-template.html"
                >
                  doc
                </Anchor>{' '}
                and paste below
              </>
            }
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
