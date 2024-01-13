import React from 'react';
import { Button, Collapse, List } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import { ExampleDataType } from '@/app/examples/examples-data';
import { ExampleDocLink } from '@/components/Docs/ExampleDocLink';

interface Props {
  name: string;
  examples: ExampleDataType[];
  tutorialLink: string;
}

const NavItemButtonMobile = ({ name, examples, tutorialLink }: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button endIcon={<KeyboardArrowDownIcon />} onClick={() => setOpen(!open)}>
        {name}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ExampleDocLink
            item={{
              icon: HelpCenterOutlinedIcon,
              title: 'Tutorial',
              description: 'Learn how to add AI Form Toolkit to your React app!',
              href: tutorialLink,
            }}
          />
          {examples.map((example) => (
            <ExampleDocLink key={example.title} item={example} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default NavItemButtonMobile;
