import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogProps,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

export interface ClaimedDialogProps extends DialogProps {
  handleClose: () => void;
}

export function ClaimedDialog({ open, handleClose }: ClaimedDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="claimed-dialog-title"
      open={open}
    >
      <DialogTitle>Claimed data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span role="img" aria-label="claimed dialog">
            This means that... 🤔
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          OKAY
        </Button>
      </DialogActions>
    </Dialog>
  );
}
