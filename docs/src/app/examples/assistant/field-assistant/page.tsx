'use client';

import { Box } from '@mui/material';
import SingleFieldFormAssistant from './../single-field-assistant/page';
import MultiFieldFormAssistant from './../multi-field-assistant/page';
import ExamSchemaGenWithAssistantExample from './../gen-with-assistant/page';

function FieldAssistantList() {
  return (
    <Box>
      <SingleFieldFormAssistant />
      <MultiFieldFormAssistant />
      <ExamSchemaGenWithAssistantExample />
    </Box>
  );
}

export default FieldAssistantList;
