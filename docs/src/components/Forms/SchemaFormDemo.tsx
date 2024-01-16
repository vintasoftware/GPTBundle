import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { FormProps, IChangeEvent } from '@rjsf/core';
import SchemaForm from '@rjsf/mui';
import { Stack, Typography } from '@mui/material';
import SchemaJsonTabs from './SchemaJsonTabs';

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
          <SchemaJsonTabs formSchema={formSchema} uiSchema={uiSchema} />
        </Stack>
      </>
    )
  );
}
