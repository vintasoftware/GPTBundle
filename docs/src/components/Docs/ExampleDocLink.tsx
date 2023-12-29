"use client";

import { ExampleDataType } from '@/app/examples/examples-data';
import {
  Text,
  Group,
  rem,
  ThemeIcon,
  Stack,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

import classes from './ExampleDocLink.module.css';

export function ExampleDocLink({ item }: {item: ExampleDataType}) {
  const theme = useMantineTheme();

  return (
    <UnstyledButton
      className={classes.exampleLink}
      key={item.title}
      component={Link}
      href={item.href}
    >
      <Group p="xs">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <Stack align='flex-start' justify='flex-start' gap={rem(2)}>
          <Text size="sm" fw={500}>{item.title}</Text>
          <Text size="xs" c="dimmed">{item.description}</Text>
        </Stack>
      </Group>
    </UnstyledButton>
  );
}
