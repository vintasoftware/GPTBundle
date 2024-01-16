import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { CopyBlock } from 'react-code-blocks';
import { SyntheticEvent, useState } from 'react';

enum TabValue {
  form = 'form',
  ui = 'ui',
}

interface Props {
  formSchema: RJSFSchema | null;
  uiSchema: UiSchema<unknown, RJSFSchema> | undefined;
}

const SchemaJsonTabs = ({ formSchema, uiSchema }: Props) => {
  const [value, setValue] = useState(TabValue.form);

  const handleChange = (_: SyntheticEvent, newValue: TabValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="JSONSchema.json" value={TabValue.form} sx={{ fontFamily: 'monospace' }} />
            <Tab label="UISchema.json" value={TabValue.ui} sx={{ fontFamily: 'monospace' }} />
          </TabList>
        </Box>
        <TabPanel value={TabValue.form}>
          <CopyBlock
            codeBlock
            text={JSON.stringify(formSchema || {}, null, 2)}
            language="json"
            showLineNumbers={false}
          />
        </TabPanel>
        <TabPanel value={TabValue.ui}>
          <CopyBlock codeBlock text={JSON.stringify(uiSchema || {}, null, 2)} language="json" showLineNumbers={false} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default SchemaJsonTabs;
