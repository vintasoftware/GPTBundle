import {
  IconBrain,
  IconBulb,
  IconCertificate,
  IconChartGridDots,
  IconCrystalBall,
  IconGavel,
  IconListCheck,
  IconRocket,
} from '@tabler/icons-react';
import { ElementType } from 'react';

export interface ExampleDataType {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
}

export const generationLinksData: ExampleDataType[] = [
  {
    icon: IconGavel,
    title: 'Forms for filling contracts',
    description: 'Generate forms for data collection from existing contracts',
    href: '/examples/generation/legal',
  },
  {
    icon: IconListCheck,
    title: 'Checklists from content',
    description: 'Generate checklist forms from existing content',
    href: '/examples/generation/checklist',
  },
  {
    icon: IconChartGridDots,
    title: 'Forms from ER diagrams',
    description: 'Generate forms from Mermaid ER diagrams',
    href: '/examples/generation/entity-relationship',
  },
  {
    icon: IconCertificate,
    title: 'Exam from topics',
    description: 'Generate exams from a list of topics or content',
    href: '/examples/generation/exam',
  },
  {
    icon: IconRocket,
    title: 'Forms from any content',
    description: 'Generate forms from any content with GPT-4',
    href: '/examples/generation/generic',
  },
];

export const assistantLinksData: ExampleDataType[] = [
  {
    icon: IconBulb,
    title: 'Enhance text Assistant',
    description: 'Enhance text with GPT-4',
    href: '/examples/assistant/single-field-assistant',
  },
  {
    icon: IconBrain,
    title: 'Fill form Assistant',
    description: 'Autofill forms with GPT-4',
    href: '/examples/assistant/multi-field-assistant',
  },
  {
    icon: IconCrystalBall,
    title: 'Generate then fill form',
    description: 'Autofill generated forms with GPT-4',
    href: '/examples/assistant/gen-with-assistant',
  },
];
