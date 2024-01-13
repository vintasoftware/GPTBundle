import React from 'react';
import { Button, Divider, Grid, Popover, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ExampleDataType } from '@/app/examples/examples-data';
import { ExampleDocLink } from '@/components/Docs/ExampleDocLink';

export enum PopoverType {
  generation = 'generation',
  assistant = 'assistant',
}

interface Props {
  name: string;
  examples: ExampleDataType[];
  tutorialLink: string;
  type: PopoverType;
  open: boolean;
  anchorEl: HTMLElement | null;
  onPopoverClose: () => void;
  onPopoverOpen: (event: React.MouseEvent<HTMLElement>, popoverType: PopoverType) => void;
}

const NavItemButtonPopover = ({
  name,
  examples,
  tutorialLink,
  type,
  open,
  anchorEl,
  onPopoverClose,
  onPopoverOpen,
}: Props) => (
  <>
    <Button endIcon={<KeyboardArrowDownIcon />} onClick={(event) => onPopoverOpen(event, type)}>
      {name}
    </Button>

    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onPopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Stack paddingX={2} width={600}>
        <Typography sx={{ p: 2 }}>{name} Examples</Typography>
        <Divider />
        <Grid container paddingY={2}>
          {examples.map((example) => (
            <Grid item xs={6} key={example.title}>
              <ExampleDocLink item={example} />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Divider />

      <Stack
        direction="row"
        justifyContent="space-between"
        paddingX={4}
        paddingY={2}
        sx={{ backgroundColor: grey[100] }}
      >
        <Stack>
          <Typography variant="body2">Tutorial</Typography>
          <Typography variant="caption" color={grey[600]}>
            Learn how to add {name} to your React app!
          </Typography>
        </Stack>
        <Button variant="outlined" href={tutorialLink} onClick={onPopoverClose}>
          Read the docs
        </Button>
      </Stack>
    </Popover>
  </>
);

export default NavItemButtonPopover;
