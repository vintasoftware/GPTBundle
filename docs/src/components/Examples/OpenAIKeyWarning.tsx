'use client';

import { Alert, AlertTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { checkOpenAIKeyExists } from '@/app/actions';

export function OpenAIKeyWarning() {
  const [hasOpenAIKey, setHasOpenAIKey] = useState<boolean | null>(null);

  useEffect(() => {
    async function _checkOpenAIKeyExists() {
      const keyExists = await checkOpenAIKeyExists();
      setHasOpenAIKey(keyExists);
    }
    _checkOpenAIKeyExists();
  }, []);

  return (
    hasOpenAIKey !== null &&
    !hasOpenAIKey && (
      <Alert severity="warning" icon={<InfoOutlinedIcon />}>
        <AlertTitle sx={{ fontWeight: 'bold' }}>Missing OpenAI API key on the server-side</AlertTitle>
        This example is interactive, but it will not work without an <b>OpenAI API key</b>. Please run the <b>docs</b>{' '}
        project in your localhost and set <code>OPENAI_API_KEY</code> at the <code>docs/.env.local</code> file. Check
        README for more details.
      </Alert>
    )
  );
}
