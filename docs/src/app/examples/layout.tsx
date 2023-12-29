import { ReactNode } from 'react';
import DocsLayout from '../docs-layout';
import { OpenAIKeyWarning } from '@/components/Examples/OpenAIKeyWarning';

type Props = {
  children: ReactNode;
};

export default function ExamplesLayout({ children }: Props) {
  return (
    <DocsLayout>
      <OpenAIKeyWarning />
      {children}
    </DocsLayout>
  );
}
