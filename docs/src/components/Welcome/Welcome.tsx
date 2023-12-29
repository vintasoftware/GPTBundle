import {
  Title,
  Text,
  Container,
  List,
  ThemeIcon,
  rem,
  Group,
  Button,
  Image,
  Anchor,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import image from './image.svg';
import classes from './Welcome.module.css';
import Link from 'next/link';

export function Welcome() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Supercharge</span> your <br /> forms with AI
          </Title>
          <Text mt="md">
            Build and enhance your{' '}
            <Text span c="blue" fw="bold" inherit>
              React
            </Text>{' '}
            forms with Artificial Intelligence. Integrated with{' '}
            <Text span c="purple" fw="bold" inherit>
              Next.js
            </Text>{' '}
            server actions for maximum productivity.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>For your Product</b> – autogenerate forms from existing content: checklists,
              surveys, exams, data collection, you name it!
            </List.Item>
            <List.Item>
              <b>For your Users</b> – help them fill your product forms with AI-powered autofill
              capabilities.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button component={Link} href="/tutorial/getting-started/" radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
