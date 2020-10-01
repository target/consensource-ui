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

export const UnclaimedDialog = ({ open, handleClose }: DialogProps) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="claimed-dialog-title"
      open={open}
    >
      <DialogTitle>Unclaimed Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The data you are viewing is from a third party data source. This means
          that it has not been verified by the organization.
        </DialogContentText>
        <DialogContentText>
          If this data is about your organization, you can claim it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          CLOSE
        </Button>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
          disabled
        >
          CLAIM
        </Button>
      </DialogActions>
    </Dialog>
  );
};
