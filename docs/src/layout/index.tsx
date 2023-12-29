import { ReactNode } from 'react';
import { AppShell, Box, rem } from '@mantine/core';
import HeaderNav from './HeaderNav/HeaderNav';
import FooterNav from './FooterNav/FooterNav';

import '@mantine/code-highlight/styles.css';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
      <AppShell.Header>
        <HeaderNav />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Box>{children}</Box>
      </AppShell.Main>
      <AppShell.Footer>
        <FooterNav />
      </AppShell.Footer>
    </AppShell>
  );
}

export default Layout;
