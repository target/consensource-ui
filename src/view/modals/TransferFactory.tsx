import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useBatchStatus } from 'services/hooks';
import { FactoryResData } from 'services/api';
import { UpdateOrganizationForm } from 'view/forms/organization';
import { DialogProps } from './utils';

export interface TransferFactoryDialogProps extends DialogProps {
  existingOrg: FactoryResData;
}

export const TransferFactoryDialog = ({
  open,
  handleClose,
  existingOrg,
}: TransferFactoryDialogProps) => {
  const { setBatchStatusLink } = useBatchStatus();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="transfer-factory-title"
      scroll="body"
      fullWidth
      maxWidth="md"
      open={open}
    >
      <DialogTitle>
        <Grid container justify="space-between">
          <h2>Confirm Factory Information</h2>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Claim this factory to manage address info, contact info, and more.
        </DialogContentText>
        <UpdateOrganizationForm
          existingOrg={existingOrg}
          setBatchStatusLink={setBatchStatusLink}
        />
      </DialogContent>
    </Dialog>
  );
};
