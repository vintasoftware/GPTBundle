import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';

export function LoadingBackdrop({
  open,
  message = 'Loading (may take up to 2 minutes)...',
}: {
  open: boolean;
  message?: string;
}) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <Stack direction="row" spacing={1}>
        <CircularProgress color="inherit" size={20} />
        {message && <Typography variant="body1">{message}</Typography>}
      </Stack>
    </Backdrop>
  );
}
