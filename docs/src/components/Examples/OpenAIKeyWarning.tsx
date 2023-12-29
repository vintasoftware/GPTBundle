"use client";

import { checkOpenAIKeyExists } from "@/app/actions";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function OpenAIKeyWarning() {
  const icon = <IconInfoCircle />;
  const [hasOpenAIKey, setHasOpenAIKey] = useState<boolean | null>(null);

  useEffect(() => {
    async function _checkOpenAIKeyExists() {
      const keyExists = await checkOpenAIKeyExists();
      setHasOpenAIKey(keyExists);
    }
    _checkOpenAIKeyExists();
  }, []);

  return (hasOpenAIKey !== null && !hasOpenAIKey) && (
    <Alert variant="light" color="orange" title="Missing OpenAI API key on the server-side" icon={icon} mb="md">
      This example is interactive, but it will not work without an <b>OpenAI API key</b>.
      Please run the <b>docs</b> project in your localhost and set <code>OPENAI_API_KEY</code> at
      the <code>docs/.env.local</code> file. Check README for more details.
    </Alert>
  );
}
