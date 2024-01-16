'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { assistantLinksData, generationLinksData } from '@/app/examples/examples-data';
import NavItemButtonMobile from './NavItemButtonMobile';
import NavItemButtonPopover, { PopoverType } from './NavItemButtonPopover';

export default function HeaderNav() {
  // Mobile state
  const [showMobileDrawer, setShowMobileDrawer] = React.useState(false);

  // Desktop state
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [openPopover, setOpenPopover] = React.useState<PopoverType | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, popoverType: PopoverType) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(popoverType);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopover(null);
  };

  const handleDrawerToggle = () => {
    setShowMobileDrawer(!showMobileDrawer);
  };

  return (
    <Box>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ backgroundColor: '#fff', borderBottom: `1px solid ${grey[300]}` }}
      >
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography
              variant="h6"
              component="span"
              sx={{
                background: 'linear-gradient(#2D0FED, #9D3EC2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <a href="/">AI Form Toolkit</a>
            </Typography>

            <Stack direction="row" spacing={{ md: 1, lg: 1.5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button href="/">Home</Button>
              <Button href="/tutorial/getting-started/">Getting Started</Button>
              <NavItemButtonPopover
                name="AI Form Generation"
                examples={generationLinksData}
                tutorialLink="/tutorial/form-generation/"
                type={PopoverType.generation}
                open={openPopover === PopoverType.generation}
                anchorEl={anchorEl}
                onPopoverClose={handlePopoverClose}
                onPopoverOpen={handlePopoverOpen}
              />
              <NavItemButtonPopover
                name="AI Form Assistant"
                examples={assistantLinksData}
                tutorialLink="/tutorial/form-assistant/"
                type={PopoverType.assistant}
                open={openPopover === PopoverType.assistant}
                anchorEl={anchorEl}
                onPopoverClose={handlePopoverClose}
                onPopoverOpen={handlePopoverOpen}
              />
            </Stack>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="contained" href="/tutorial/getting-started/">
                Install
              </Button>
            </Box>
          </Stack>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={showMobileDrawer}
        onClose={handleDrawerToggle}
        PaperProps={{ style: { width: '90%', height: '100%' } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" paddingY={1} paddingX={3}>
          <Typography
            variant="h6"
            component="span"
            sx={{
              background: 'linear-gradient(#2D0FED, #9D3EC2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <a href="/">AI Form Toolkit</a>
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          <ListItem>
            <Button href="/">Home</Button>
          </ListItem>
          <ListItem>
            <Button href="/tutorial/getting-started/">Getting Started</Button>
          </ListItem>
          <ListItem>
            <Stack alignItems="flex-start">
              <NavItemButtonMobile
                name="AI Form Generation"
                examples={generationLinksData}
                tutorialLink="/tutorial/form-generation/"
              />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack alignItems="flex-start">
              <NavItemButtonMobile
                name="AI Form Assistant"
                examples={assistantLinksData}
                tutorialLink="/tutorial/form-assistant/"
              />
            </Stack>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem sx={{ maxWidth: 350, marginX: 'auto' }}>
            <Button fullWidth variant="contained" href="/tutorial/getting-started/">
              Install
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
