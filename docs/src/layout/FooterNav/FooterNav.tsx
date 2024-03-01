import React from 'react';
import { Box, Link, IconButton, SvgIcon } from '@mui/material';
// Import the icons
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GithubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';

const footerContainer = {
  borderTop: '1px solid #302c3f',
  padding: '48px',

  '@media (max-width: 900px)': {
    padding: '30px',
  },
};

const footer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  marginBottom: 0,
  paddingTop: 0,
  maxWidth: '1246px',
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media (max-width: 900px)': {
    flexDirection: 'column',
    alignContent: 'center',
  },
};

const footerLinks = {
  display: 'flex',
  gridColumnGap: '32px',
  gridRowGap: '32px',
  height: '44px',

  '@media (max-width: 900px)': {
    a: {
      margin: 0,
    },
  },
};

const footerSocial = {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '-15px',
  marginRight: '-15px',

  '@media (max-width: 900px)': {
    paddingTop: '15px',
    paddingBottom: '28px',
    justifyContent: 'space-between',
  },
};

const linkStyles = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '500',
  textDecoration: 'none',
  marginRight: '32px',
  alignSelf: 'center',
};

const buttonStyle = {
  width: '29px',
  maxHeight: '29px',
  minHeight: '29px',
  minWidth: '29px',
  border: '2px solid #af93ff',
  color: '#af93ff',
  transformStyle: 'preserve-3d',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '15px',
  fontFamily: 'Icons Dark Template, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  textDecoration: 'none',
  transitionProperty: 'transform',
  display: 'flex',
  overflow: 'hidden',
  WebkitTextStrokeColor: '#000',
  backgroundImage: 'none',
  borderRadius: '8px',
  padding: '20px',
};

const FooterNav = () => (
  <Box sx={{ ...footerContainer }}>
    <Box component="footer" sx={{ ...footer }}>
      <Box component="div" sx={{ ...footerLinks }}>
        <Link href="https://www.vintasoftware.com" target="_blank" sx={{ ...linkStyles }}>
          © 2024 Vinta Software
        </Link>
        <Link href="https://www.vintasoftware.com/privacy-policy" target="_blank" sx={{ ...linkStyles }}>
          Privacy Policy
        </Link>
      </Box>
      <Box sx={{ ...footerSocial }}>
        <IconButton href="http://www.linkedin.com/company/3488734" target="_blank" sx={{ ...buttonStyle }}>
          <LinkedinIcon />
        </IconButton>
        <IconButton href="https://github.com/vintasoftware/" target="_blank" sx={{ ...buttonStyle }}>
          <GithubIcon />
        </IconButton>
        <IconButton href="https://twitter.com/vintasoftware" target="_blank" sx={{ ...buttonStyle }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="https://www.instagram.com/vintasoftware/" target="_blank" sx={{ ...buttonStyle }}>
          <InstagramIcon />
        </IconButton>
        <IconButton href="https://www.youtube.com/@VintaSoftware" target="_blank" sx={{ ...buttonStyle }}>
          <YoutubeIcon />
        </IconButton>
      </Box>
    </Box>
  </Box>
);

export default FooterNav;
