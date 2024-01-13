import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { FormProps, IChangeEvent } from '@rjsf/core';
import SchemaForm from '@rjsf/mui';
import { Stack, Typography } from '@mui/material';

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
        <Stack>
          <Typography variant="h5">Generated Form:</Typography>
          <SchemaForm schema={formSchema} uiSchema={uiSchema} validator={validator} onSubmit={onSubmit} {...props} />
        </Stack>

        <Stack spacing={2} paddingTop={1}>
          <Typography variant="h5">Actual form code:</Typography>
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
        </Stack>
      </>
    )
  );
}
