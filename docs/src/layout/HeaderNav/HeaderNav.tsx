'use client';

import {
  Box,
  Text,
  Button,
  Drawer,
  Group,
  rem,
  ScrollArea,
  useMantineTheme,
  Burger,
  UnstyledButton,
  Popover,
  Center,
  Divider,
  SimpleGrid,
  Collapse,
  MantineTheme,
} from '@mantine/core';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';
import classes from './HeaderNav.module.css';
import { assistantLinksData, generationLinksData } from '@/app/examples/examples-data';
import { ExampleDocLink } from '@/components/Docs/ExampleDocLink';

type MenuType = 'tutorial' | 'assistant' | 'generation';

const HeaderWebMenu = ({
  openedMenu,
  setOpenedMenu,
  name,
  title,
  tutorialLink,
  theme,
  children,
}: {
  openedMenu: MenuType | null;
  setOpenedMenu: (menu: MenuType | null) => void;
  name: MenuType;
  title: string;
  tutorialLink: string;
  theme: MantineTheme;
  children: ReactNode;
}) => {
  const ref = useClickOutside(() => setOpenedMenu(null));

  return (
    <Popover
      opened={openedMenu === name}
      width={600}
      position="bottom"
      radius="md"
      shadow="md"
      withinPortal
      zIndex={1000000}
    >
      <Popover.Target>
        <a
          href="#"
          className={classes.link}
          onClick={(e) => {
            setOpenedMenu(name);
            e.preventDefault();
          }}
        >
          <Center inline>
            <Box component="span" mr={5}>
              {title}
            </Box>
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
          </Center>
        </a>
      </Popover.Target>

      <Popover.Dropdown style={{ overflow: 'hidden' }} ref={ref}>
        <Group justify="space-between" px="md">
          <Text fw={500}>{title} Examples</Text>
        </Group>

        <Divider my="sm" />

        <SimpleGrid cols={2} spacing={0}>
          {children}
        </SimpleGrid>

        <div className={classes.dropdownFooter}>
          <Group justify="space-between">
            <div>
              <Text fw={500} fz="sm">
                Tutorial
              </Text>
              <Text size="xs" c="dimmed">
                Learn how to add {title} to your React app!
              </Text>
            </div>
            <Button component={Link} href={tutorialLink} variant="default" onClick={() => setOpenedMenu(null)}>
              Read the docs
            </Button>
          </Group>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

const HeaderMobileMenu = ({
  title,
  tutorialLink,
  theme,
  children,
}: {
  title: string;
  tutorialLink: string;
  theme: MantineTheme;
  children: ReactNode;
}) => {
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className={classes.link} onClick={toggleLinks}>
        <Center inline>
          <Box component="span" mr={5}>
            {title}
          </Box>
          <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
        </Center>
      </UnstyledButton>
      <Collapse in={linksOpened}>
        <ExampleDocLink
          item={{
            icon: HelpCenterOutlinedIcon,
            title: 'Tutorial',
            description: 'Learn how to add AI Form Toolkit to your React app!',
            href: tutorialLink,
          }}
        />
        {children}
      </Collapse>
    </>
  );
};

const HeaderNav = () => {
  // Web:
  const [openedMenu, setOpenedMenu] = useState<MenuType | null>(null);

  // Mobile:
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  // Both:
  const closeAllMenus = () => {
    setOpenedMenu(null);
    closeDrawer();
  };
  const theme = useMantineTheme();

  return (
    <Box className={classes.header}>
      <Group justify="space-between" h="100%">
        <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'grape' }}>
          <Link href="/">AI Form Toolkit</Link>
        </Text>

        <Group h="100%" gap={0} visibleFrom="sm">
          <Link href="/" className={classes.link}>
            Home
          </Link>

          <Link href="/tutorial/getting-started/" className={classes.link}>
            Getting Started
          </Link>

          <HeaderWebMenu
            openedMenu={openedMenu}
            setOpenedMenu={setOpenedMenu}
            name="generation"
            title="AI Form Generation"
            tutorialLink="/tutorial/form-generation/"
            theme={theme}
          >
            {generationLinksData.map((item) => (
              <ExampleDocLink item={item} />
            ))}
          </HeaderWebMenu>

          <HeaderWebMenu
            openedMenu={openedMenu}
            setOpenedMenu={setOpenedMenu}
            name="assistant"
            title="AI Form Assistant"
            tutorialLink="/tutorial/form-assistant/"
            theme={theme}
          >
            {assistantLinksData.map((item) => (
              <ExampleDocLink item={item} />
            ))}
          </HeaderWebMenu>
        </Group>

        <Group visibleFrom="sm">
          <Button component={Link} href="/tutorial/getting-started/">
            Install
          </Button>
        </Group>

        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
      </Group>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className={classes.link} onClick={closeAllMenus}>
            Home
          </Link>

          <Link href="/tutorial/getting-started/" className={classes.link} onClick={closeAllMenus}>
            Getting Started
          </Link>

          <HeaderMobileMenu title="AI Form Generation" tutorialLink="/tutorial/form-generation/" theme={theme}>
            <Stack sx={{ maxWidth: '90%' }}>
              {generationLinksData.map((item) => (
                <ExampleDocLink item={item} />
              ))}
            </Stack>
          </HeaderMobileMenu>

          <HeaderMobileMenu title="AI Form Assistant" tutorialLink="/tutorial/form-assistant/" theme={theme}>
            <Stack sx={{ maxWidth: '90%' }}>
              {assistantLinksData.map((item) => (
                <ExampleDocLink item={item} />
              ))}
            </Stack>
          </HeaderMobileMenu>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button component={Link} href="/tutorial/getting-started/" onClick={closeAllMenus}>
              Install
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderNav;
