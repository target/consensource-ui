import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { DialogProps } from './utils';

export const ClaimedDialog = ({ open, handleClose }: DialogProps) => {
  return (
    <Dialog
      aria-labelledby="claimed-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Claimed Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The data you are viewing has been claimed by the organization that it
          relates to.
        </DialogContentText>
        <DialogContentText>
          This means that is up-to-date and verifiably accurate.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          CLOSE
        </Button>
        <Button disabled variant="contained" color="secondary">
          VIEW HISTORY
        </Button>
      </DialogActions>
    </Dialog>
  );
};
