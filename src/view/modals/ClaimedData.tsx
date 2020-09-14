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

export function ClaimedDialog({ open, handleClose }: DialogProps) {
  return (
    <Dialog
      aria-labelledby="claimed-dialog-title"
      open={open}
      onClose={handleClose}
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
