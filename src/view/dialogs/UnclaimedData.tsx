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

export function UnclaimedDialog({ open, handleClose }: DialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="claimed-dialog-title"
      open={open}
    >
      <DialogTitle>Claimed Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The data you are viewing is from a third party data source. If this
          data is about your organization, you can claim it.
        </DialogContentText>
        <DialogContentText>
          More information on 3rd party data sources and the claims process can
          be found here.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          CLOSE
        </Button>
        <Button onClick={handleClose} color="secondary" variant="contained">
          CLAIM
        </Button>
      </DialogActions>
    </Dialog>
  );
}
