'use client';

import React from 'react';
import { AppBar, Box, Link, Divider, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { ExampleLinks } from '@/components/Docs/ExampleLinks';
import { generationLinksData } from '@/app/examples/examples-data';
import NavItemButtonPopover, { PopoverType } from './NavItemButtonPopover';
import logo from './../../assets/gptbundle-logo.png';
import GithubIcon from '@mui/icons-material/Github';

const buttonStyle = {
  width: '29px',
  maxHeight: '29px',
  minHeight: '29px',
  minWidth: '29px',
  border: '2px solid #af93ff',
  color: '#af93ff',
  transformStyle: 'preserve-3d',
  fontFamily: 'Icons Dark Template, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  textDecoration: 'none',
  transitionProperty: 'transform',
  overflow: 'hidden',
  WebkitTextStrokeColor: '#000',
  backgroundImage: 'none',
  borderRadius: '8px',
  padding: '20px',
};

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
    <Box sx={{ paddingTop: '74px' }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          maxWidth: '1340px',
          margin: 'auto',
          backgroundColor: 'rgb(19, 11, 47)',
          zIndex: 2,
          WebkitBackdropFilter: 'blur(20px)',
          backdropFilter: 'blur(20px)',
          padding: '11px 24px',
          top: '0%',
          bottom: 'auto',
          left: '0%',
          right: '0%',
        }}
      >
        <Toolbar
          sx={{
            paddingLeft: '0',
            paddingRight: '0',

            '@media (min-width: 600px)': {
              paddingLeft: '0',
              paddingRight: '0',
            },
          }}
        >
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
              <Link href="/" sx={{ height: '48px', display: 'block' }}>
                <Box component="img" sx={{ width: 160, border: 'none' }} alt="Logo" src={logo.src} />
              </Link>
            </Typography>

            <Stack direction="row" spacing={{ md: 1, lg: 1.5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavItemButtonPopover
                name="Features Demonstration"
                examples={generationLinksData}
                type={PopoverType.generation}
                open={openPopover === PopoverType.generation}
                anchorEl={anchorEl}
                onPopoverClose={handlePopoverClose}
                onPopoverOpen={handlePopoverOpen}
              />
            </Stack>
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
        PaperProps={{ style: { width: '90%', height: '100%', backgroundColor: '#0a061a', backgroundImage: 'none' } }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingY={1}
          paddingX={3}
          sx={{ backgroundColor: '#0a061a' }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              background: 'linear-gradient(#2D0FED, #9D3EC2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Link href="/">
              <Box
                component="img"
                sx={{
                  width: 160,
                  marginTop: '10px',
                  border: 'none',
                }}
                alt="Logo"
                src={logo.src}
              />
            </Link>
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack paddingX={2} width={600} sx={{ backgroundColor: '#0a061a' }}>
          <Typography sx={{ p: 2 }}>Explore potential uses of GPTBundle*</Typography>
        </Stack>
        <Box
          sx={{
            marginLeft: '22px',
            maxWidth: '350px',
          }}
        >
          <ExampleLinks linksData={generationLinksData} />
        </Box>
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
              <Box sx={{ maxWidth: '500px', width: '100%', paddingRight: '20px' }}>
                Please note that a full functionality access requires an OpenAI API key. This demonstration is limited
                to showing visual examples of the forms.
              </Box>
            </Typography>
          </Stack>
          <Box sx={{ display: 'block' }}>
            <IconButton href="https://github.com/vintasoftware/" target="_blank" sx={{ ...buttonStyle }}>
              <GithubIcon />
            </IconButton>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
