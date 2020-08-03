import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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
