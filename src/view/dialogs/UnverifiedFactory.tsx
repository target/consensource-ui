import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { FactoryResData } from 'services/api/factory';

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
