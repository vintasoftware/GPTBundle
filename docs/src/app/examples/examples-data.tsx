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
    icon: TipsAndUpdatesOutlinedIcon,
    title: 'AI Form Assistant',
    description:
      'A GPT-4 companion that automates form filling, generates custom forms via prompts, and polishes text for improved clarity and engagement, all with minimal input.',
    href: '/examples/assistant/field-assistant',
  },
  {
    icon: RocketLaunchOutlinedIcon,
    title: 'Dynamic Form Creator',
    description:
      'Streamline user data collection with dynamic form generation and AI-powered field prediction, boosting efficiency and accuracy.',
    href: '/examples/generation/generic',
  },
  {
    icon: GavelOutlinedIcon,
    title: 'Legal Contracts Creator',
    description:
      "Instantly generate and customize legal documents with GPT's AI, ensuring accuracy and compliance without the hassle.",
    href: '/examples/generation/legal',
  },
  {
    icon: WorkspacePremiumOutlinedIcon,
    title: 'Exam Creator',
    description:
      'Generate a theoretical evaluation form with a list of questions based on subject topics, technical content, or any information provided along with a prompt.',
    href: '/examples/generation/exam',
  },
  {
    icon: ChecklistOutlinedIcon,
    title: 'Checklist Creator',
    description:
      'Prepare an automatic step-by-step checklist based on any piece of content and fully functional checkmark buttons.',
    href: '/examples/generation/checklist',
  },
  {
    icon: AccountTreeOutlinedIcon,
    title: 'ER Diagram-Based Form Creation',
    description:
      'Transform complex Mermaid ER diagrams into forms effortlessly, enabling clear input and representation of complex data.',
    href: '/examples/generation/entity-relationship',
  },
];
