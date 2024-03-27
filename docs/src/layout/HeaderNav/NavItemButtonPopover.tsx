import React from 'react';
import { Box, Button, Divider, Grid, Popover, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ExampleDataType } from '@/app/examples/examples-data';
import { ExampleDocLink } from '@/components/Docs/ExampleDocLink';
import GitHubIcon from '@mui/icons-material/GitHub';

export enum PopoverType {
  generation = 'generation',
  assistant = 'assistant',
}

interface Props {
  name: string;
  examples: ExampleDataType[];
  type: PopoverType;
  open: boolean;
  anchorEl: HTMLElement | null;
  onPopoverClose: () => void;
  onPopoverOpen: (event: React.MouseEvent<HTMLElement>, popoverType: PopoverType) => void;
}

const NavItemButtonPopover = ({ name, examples, type, open, anchorEl, onPopoverClose, onPopoverOpen }: Props) => (
  <>
    <Button
      endIcon={<KeyboardArrowDownIcon />}
      onClick={(event) => onPopoverOpen(event, type)}
      style={{
        letterSpacing: '0.01em',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '1.111em',
        textDecoration: 'none',
        transition: 'color 0.35s',
        color: 'rgb(255 255 255)',
      }}
    >
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
      <Stack paddingX={2} width={600} sx={{ backgroundColor: '#0a061a' }}>
        <Typography sx={{ p: 2 }}>Explore potential uses of GPTBundle*</Typography>
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
        sx={{ backgroundColor: '#1d1a27' }}
      >
        <Stack>
          <Typography variant="body2">OpenAI API key is required*</Typography>
          <Typography variant="caption" color={grey[600]}>
            <Box sx={{ maxWidth: '380px' }}>
              Please note that a full functionality access requires an OpenAI API key. This demonstration is limited to
              showing visual examples of the forms.
            </Box>
          </Typography>
        </Stack>
        <Button
          sx={{ height: '40px' }}
          startIcon={<GitHubIcon />}
          variant="outlined"
          target={'_blank'}
          href={'https://github.com/vintasoftware/GPTBundle/'}
          onClick={onPopoverClose}
        >
          Visit GitHub
        </Button>
      </Stack>
    </Popover>
  </>
);

export default NavItemButtonPopover;
