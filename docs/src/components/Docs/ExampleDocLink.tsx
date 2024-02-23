'use client';

import { Card, CardActionArea, Typography, Stack, Paper } from '@mui/material';

import { blue, grey } from '@mui/material/colors';
import { ExampleDataType } from '@/app/examples/examples-data';

export function ExampleDocLink({ item, iconColor = blue[600] }: { item: ExampleDataType; iconColor?: string }) {
  return (
    <Card key={item.title} elevation={0}>
      <CardActionArea href={item.href} sx={{ padding: 1, backgroundColor: '#0a061a' }}>
        <Stack direction="row" spacing={2}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
              padding: 1,
              borderRadius: '25%',
            }}
          >
            <item.icon fontSize="medium" sx={{ color: iconColor }} />
          </Paper>

          <Stack>
            <Typography variant="body2">{item.title}</Typography>
            <Typography variant="caption" sx={{ color: '#757575' }}>
              {item.description}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
