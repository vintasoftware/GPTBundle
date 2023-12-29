import { Box, Title } from '@mantine/core';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { FormProps, IChangeEvent } from '@rjsf/core';
import SchemaForm from './SchemaForm';

export default function SchemaFormDemo({
  formSchema,
  uiSchema,
  onSubmit,
  ...props
}: {
  formSchema: RJSFSchema | null;
  uiSchema: UiSchema<unknown, RJSFSchema> | undefined;
  onSubmit: (event: IChangeEvent<unknown, RJSFSchema>) => void;
  props?: FormProps<unknown, RJSFSchema>;
}) {
  return (
    formSchema && (
      <>
        <Box mb="md">
          <Title order={3} mb="xs">
            Generated Form:
          </Title>
          <SchemaForm
            schema={formSchema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={onSubmit}
            {...props}
          />
        </Box>
        <Box mb="md">
          <Title order={3} mb="xs">
            Actual form code:
          </Title>
          <CodeHighlightTabs
            code={[
              {
                fileName: 'JSONSchema.json',
                code: JSON.stringify(formSchema || {}, null, 2),
                language: 'json',
              },
              {
                fileName: 'UISchema.json',
                code: JSON.stringify(uiSchema || {}, null, 2),
                language: 'json',
              },
            ]}
            mb="md"
          />
        </Box>
      </>
    )
  );
}
