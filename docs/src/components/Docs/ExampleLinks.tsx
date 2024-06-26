import { Stack } from '@mui/material';
import { ExampleDocLink } from './ExampleDocLink';
import { ExampleDataType } from '@/app/examples/examples-data';

export function ExampleLinks({ linksData }: { linksData: ExampleDataType[] }) {
  return (
    <Stack spacing={2} paddingBottom={2}>
      {linksData.map((item) => (
        <ExampleDocLink key={item.title} item={item} />
      ))}
    </Stack>
  );
}
