import { Avatar, Box, Button, List, ListItem, ListItemText, Typography, Stack } from '@mui/material';
import { blue, purple } from '@mui/material/colors';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import image from './image.svg';

export function Welcome() {
  return (
    <Box display="flex" justifyContent="center">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ sm: 2, md: 12 }}
        paddingY={{ xs: 4, sm: 8, md: 16 }}
        paddingX={3}
        justifyContent="space-between"
      >
        <Stack maxWidth={456} spacing={2}>
          <Stack>
            <Typography variant="h3">
              <Box component="span" borderRadius={1} paddingY={0.5} paddingX={1} sx={{ backgroundColor: blue[50] }}>
                Supercharge
              </Box>{' '}
              your
              <Typography variant="h3">forms with AI</Typography>
            </Typography>
          </Stack>

          <Typography variant="body1">
            Build and enhance your{' '}
            <Box component="span" color={blue[600]} fontWeight="bold">
              React
            </Box>{' '}
            forms with Artificial Intelligence. Integrated with{' '}
            <Box component="span" color={purple[600]} fontWeight="bold">
              Next.js
            </Box>{' '}
            server actions for maximum productivity.
          </Typography>

          <List>
            <ListItem sx={{ gap: 2, p: 0 }}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: blue[600] }}>
                <CheckOutlinedIcon fontSize="small" />
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <b>For your Product</b> – autogenerate forms from existing content: checklists, surveys, exams, data
                    collection, you name it!
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ gap: 2, p: 0 }}>
              <Avatar sx={{ width: 24, height: 24, bgcolor: blue[600] }}>
                <CheckOutlinedIcon fontSize="small" />
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <b>For your Users</b> – help them fill your product forms with AI-powered autofill capabilities.
                  </Typography>
                }
              />
            </ListItem>
          </List>

          <Button variant="contained" href="/tutorial/getting-started/" size="large" sx={{ alignSelf: 'flex-start' }}>
            Get started
          </Button>
        </Stack>

        <Box
          component="img"
          srcSet={image.src}
          src={image.src}
          width={376}
          height={356}
          loading="lazy"
          alt="Person typing on laptop"
          sx={{ display: { xs: 'none', md: 'block' } }}
        />
      </Stack>
    </Box>
  );
}
