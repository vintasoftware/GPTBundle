import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import GithubIcon from '@mui/icons-material/GitHub';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiPaper-root': {
    position: 'absolute',
    top: theme.spacing(5),
    backgroundColor: 'rgb(10, 6, 26)',
  },
}));

export const useRequestDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const requestDialog = async (requestFunction: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await requestFunction();
    } catch (error: unknown) {
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDialog = () => (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        OpenAI API key is required
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: '30px 16px!important' }}>
        <Typography gutterBottom>
          To fully access this form, an OpenAI API key is required. Please download the code and input an OpenAI API key
          in your local environment.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ height: '40px', paddingTop: '12px', paddingBottom: '12px', fontWeight: 600 }}
          startIcon={<GithubIcon />}
          variant="outlined"
          target={'_blank'}
          href={'https://github.com'}
        >
          Visit GitHub
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );

  return { requestDialog, renderDialog, isLoading };
};
