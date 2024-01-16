import { ReactNode } from 'react';
import { Box } from '@mui/material';
import HeaderNav from './HeaderNav/HeaderNav';
import FooterNav from './FooterNav/FooterNav';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <HeaderNav />
      <Box flexGrow={1} width="-webkit-fill-available">
        {children}
      </Box>
      <FooterNav />
    </Box>
  );
}

export default Layout;
