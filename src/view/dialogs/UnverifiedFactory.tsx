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
import { FactoryResData } from 'services/api';

export interface UnverifiedFactoryDialogProps extends DialogProps {
  factory: FactoryResData;
  handleClose: () => void;
}

export function UnverifiedFactoryDialog({
  open,
  handleClose,
  factory,
}: UnverifiedFactoryDialogProps) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="unverified-factory-dialog-title"
      open={open}
    >
      <DialogTitle>Unverified Factories</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <i>{factory.name}</i> is an unverified factory. This means that... 🤔
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
