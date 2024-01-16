import { ElementType } from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import FiberSmartRecordOutlinedIcon from '@mui/icons-material/FiberSmartRecordOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

export interface ExampleDataType {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
}

export const generationLinksData: ExampleDataType[] = [
  {
    icon: GavelOutlinedIcon,
    title: 'Forms for filling contracts',
    description: 'Generate forms for data collection from existing contracts',
    href: '/examples/generation/legal',
  },
  {
    icon: ChecklistOutlinedIcon,
    title: 'Checklists from content',
    description: 'Generate checklist forms from existing content',
    href: '/examples/generation/checklist',
  },
  {
    icon: AccountTreeOutlinedIcon,
    title: 'Forms from ER diagrams',
    description: 'Generate forms from Mermaid ER diagrams',
    href: '/examples/generation/entity-relationship',
  },
  {
    icon: WorkspacePremiumOutlinedIcon,
    title: 'Exam from topics',
    description: 'Generate exams from a list of topics or content',
    href: '/examples/generation/exam',
  },
  {
    icon: RocketLaunchOutlinedIcon,
    title: 'Forms from any content',
    description: 'Generate forms from any content with GPT-4',
    href: '/examples/generation/generic',
  },
];

export const assistantLinksData: ExampleDataType[] = [
  {
    icon: TipsAndUpdatesOutlinedIcon,
    title: 'Enhance text Assistant',
    description: 'Enhance text with GPT-4',
    href: '/examples/assistant/single-field-assistant',
  },
  {
    icon: PsychologyOutlinedIcon,
    title: 'Fill form Assistant',
    description: 'Autofill forms with GPT-4',
    href: '/examples/assistant/multi-field-assistant',
  },
  {
    icon: FiberSmartRecordOutlinedIcon,
    title: 'Generate then fill form',
    description: 'Autofill generated forms with GPT-4',
    href: '/examples/assistant/gen-with-assistant',
  },
];
